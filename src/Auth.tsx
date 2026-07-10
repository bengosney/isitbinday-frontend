import apiFetch, {
  login as doLogin,
  logout as doLogout,
  checkLogin,
  loginViaGoogleJWT as doLoginViaGoogleJWT,
} from './utils/apiFetch';
import React, { useReducer, useEffect } from 'react';

interface AuthContextType {
  loggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loginViaGoogleJWT: (jwt: string) => Promise<void>;
}

export const authContext = React.createContext<AuthContextType>({
  loggedIn: false,
  login: async () => {},
  logout: () => {},
  loginViaGoogleJWT: async () => {},
});

interface LoginState {
  loggedIn: boolean;
}

type LoginAction = { type: 'loggedIn' } | { type: 'loggedOut' };

const Auth = ({ children }: { children: React.ReactNode }) => {
  const ACTION_LOGGED_IN = 'loggedIn' as const;
  const ACTION_LOGGED_OUT = 'loggedOut' as const;

  const { Provider } = authContext;

  const [loginState, loginDispatch] = useReducer(
    (state: LoginState, action: LoginAction): LoginState => {
      switch (action.type) {
        case ACTION_LOGGED_IN:
          apiFetch('api/tasks/tasks/auto_archive/');
          return { loggedIn: true };
        case ACTION_LOGGED_OUT:
          return { loggedIn: false };
        default:
          throw new Error(`${(action as { type: string }).type} not supported`);
      }
    },
    { loggedIn: checkLogin() }
  );

  useEffect(() => {
    const localStorageUpdated = () => {
      if (!checkLogin()) {
        loginDispatch({ type: ACTION_LOGGED_OUT });
      }
    };

    window.addEventListener('storage', localStorageUpdated);

    return () => window.removeEventListener('storage', localStorageUpdated);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      await doLogin(username, password);
      loginDispatch({ type: ACTION_LOGGED_IN });
    } catch {
      loginDispatch({ type: ACTION_LOGGED_OUT });
    }
  };

  const logout = () => {
    doLogout();
    loginDispatch({ type: ACTION_LOGGED_OUT });
  };

  const loginViaGoogleJWT = async (jwt: string) => {
    try {
      await doLoginViaGoogleJWT(jwt);
      loginDispatch({ type: ACTION_LOGGED_IN });
    } catch {
      loginDispatch({ type: ACTION_LOGGED_OUT });
    }
  };

  return <Provider value={{ loggedIn: loginState.loggedIn, login, logout, loginViaGoogleJWT }}>{children}</Provider>;
};

export default Auth;
