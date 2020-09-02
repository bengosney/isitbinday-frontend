import React, { useState, useEffect, useCallback, useReducer } from 'react';
import LoginForm from './widgets/LoginForm';
import apiFetch from './utils/apiFetch';

export const authContext = React.createContext({ loggedIn: false });

const Auth = ({ children }) => {
  const ACTION_LOGGEDIN = 'loggedIn';
  const ACTION_LOGGEDOUT = 'loggedOut';

  const { Provider } = authContext;

  const [loginState, loginDispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case ACTION_LOGGEDIN:
          localStorage.setItem('token', action.token);
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
    apiFetch('api-token-auth/', { username: username, password: password }).then((res) =>
      loginDispatch({ type: ACTION_LOGGEDIN, token: res.token })
    );
  };
  const logout = () => loginDispatch({ type: ACTION_LOGGEDOUT });

  return <Provider value={{ loggedIn: loginState.loggedIn, login, logout }}>{children}</Provider>;
};

export default Auth;
