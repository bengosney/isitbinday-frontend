import React, { useReducer, useEffect } from 'react';
import apiFetch, { login as doLogin, logout as doLogout, checkLogin } from './utils/apiFetch';

export const authContext = React.createContext({ loggedIn: false });

const Auth = ({ children }) => {
  const ACTION_LOGGED_IN = 'loggedIn';
  const ACTION_LOGGED_OUT = 'loggedOut';

  const { Provider } = authContext;

  const [loginState, loginDispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case ACTION_LOGGED_IN:
          apiFetch('api/tasks/tasks/auto_archive/');
          return { loggedIn: true };
        case ACTION_LOGGED_OUT:
          return { loggedIn: false };
        default:
          throw new Error(`${action.type} not supported`);
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

  const login = async (username, password) => {
    try {
      await doLogin(username, password);
      loginDispatch({ type: ACTION_LOGGED_IN });
    } catch (err) {
      loginDispatch({ type: ACTION_LOGGED_OUT });
    }
  };

  const logout = () => {
    doLogout();
    loginDispatch({ type: ACTION_LOGGED_OUT });
  };

  return <Provider value={{ loggedIn: loginState.loggedIn, login, logout }}>{children}</Provider>;
};

export default Auth;
