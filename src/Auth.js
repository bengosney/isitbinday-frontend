import React, { useReducer } from 'react';
import apiFetch, { origin } from './utils/apiFetch';

export const authContext = React.createContext({ loggedIn: false });

export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh');
};

export const checkAuth = () => {
  const refresh = localStorage.getItem('refresh');

  return refresh !== null;
};

export const refreshToken = async () => {
  if (refreshToken.isRefreshing === false) {
    refreshToken.isRefreshing = true;
    console.log('new refresh promise');
    refreshToken.refreshPromise = new Promise((resolve, reject) => {
      (async () => {
        const refresh = localStorage.getItem('refresh');

        if (refresh === null) {
          console.log('No refresh token', refresh);
          reject('No refresh token');
        }

        clearAuth();

        const res = await fetch(`${origin}/api/token/refresh/`, { refresh });

        if (res.status == 200) {
          localStorage.setItem('token', res.access);
          localStorage.setItem('refresh', res.refresh);

          refreshToken.isRefreshing = false;
          resolve(true);
        }

        reject(`Failed to fetch token: ${res.status}`);
      })();
    });
  }

  return refreshToken.refreshPromise;
};

refreshToken.refreshPromise = null;
refreshToken.isRefreshing = false;

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
          apiFetch('api/tasks/tasks/auto_archive/');
          return { loggedIn: true };
        case ACTION_LOGGEDOUT:
          localStorage.removeItem('token');
          localStorage.removeItem('refresh');
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
