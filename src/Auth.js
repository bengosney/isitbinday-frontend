import React, { useReducer } from 'react';
import apiFetch from './utils/apiFetch';

export const authContext = React.createContext({ loggedIn: false });

export const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh');

  if (refresh === null) {
    return false;
  }

  localStorage.removeItem('token');
  localStorage.removeItem('refresh');

  const res = await apiFetch('api/token/refresh/', { refresh });

  localStorage.setItem('token', res.access);
  localStorage.setItem('refresh', res.refresh);

  return true;
};

const Auth = ({ children }) => {
  const ACTION_LOGGEDIN = 'loggedIn';
  const ACTION_LOGGEDOUT = 'loggedOut';

  const { Provider } = authContext;

  const [loginState, loginDispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case ACTION_LOGGEDIN:
          localStorage.setItem('token', action.tokens.access);
          localStorage.setItem('refresh', action.tokens.refresh);
          return { loggedIn: true };
        case ACTION_LOGGEDOUT:
          return { loggedIn: false };
        default:
          throw new Error(`${action.type} not supported`);
      }
    },
    { loggedIn: localStorage.getItem('token') != null }
  );

  const login = (username, password) => {
    apiFetch('api/token/', { username: username, password: password }).then((res) =>
      loginDispatch({ type: ACTION_LOGGEDIN, tokens: res })
    );
  };
  const logout = () => loginDispatch({ type: ACTION_LOGGEDOUT });

  return <Provider value={{ loggedIn: loginState.loggedIn, login, logout }}>{children}</Provider>;
};

export default Auth;
