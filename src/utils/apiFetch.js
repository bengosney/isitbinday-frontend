import { useState, useEffect } from 'react';

export const origin = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
  window.dispatchEvent(new Event('storage'));
};

const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
  window.dispatchEvent(new Event('storage'));
};

const fetchFromOrigin = async (resource, init = {}) => {
  const cleanResource = `${resource}`.replace(`${origin}/`, '');
  return fetch(`${origin}/${cleanResource}`, init);
};

const fetchJsonFromOrigin = async (resource, init = {}) => {
  const response = await fetchFromOrigin(resource, init);

  if (response.status !== 200) {
    throw new Error(response);
  }

  return response.json();
};

const clearAuth = () => {
  removeLocalStorage('token');
  removeLocalStorage('refresh');
};

const getRefresh = () => {
  return localStorage.getItem('refresh');
};

const setRefresh = (token) => {
  setLocalStorage('refresh', token);
};

const getToken = () => {
  return localStorage.getItem('token');
};

const setToken = (token) => {
  setLocalStorage('token', token);
};

const checkRefresh = () => {
  const refresh = getRefresh();
  return refresh !== null && typeof refresh !== 'undefined';
};

export const refreshToken = async () => {
  if (refreshToken.isRefreshing === false) {
    refreshToken.isRefreshing = true;
    refreshToken.refreshPromise = new Promise((resolve, reject) => {
      (async () => {
        const refresh = getRefresh() || null;

        if (refresh == null) {
          return reject('No refresh token');
        }

        const options = getOptions({ refresh });

        const res = await fetchFromOrigin('api/token/refresh/', options);
        if (res.status != 200) {
          clearAuth();
          return reject(`${res.status}`);
        }

        const json = await res.json();

        setToken(json.access);
        setRefresh(json.refresh);
        return resolve(true);
      })();
    })
      .then(() => (refreshToken.isRefreshing = false))
      .then(() => true);
  }

  return refreshToken.refreshPromise;
};

refreshToken.refreshPromise = null;
refreshToken.isRefreshing = false;

export const login = async (username, password) => {
  const options = getOptions({ username: username, password: password });
  const res = await fetchJsonFromOrigin('api/token/', options);

  setToken(res.access);
  setRefresh(res.refresh);

  return true;
};

export const logout = async () => {
  clearAuth();
};

export const checkLogin = () => {
  return checkRefresh();
};

const getOptions = (args = null, method = null) => {
  const token = getToken();

  const options =
    args != null
      ? {
          method: method || 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(args),
        }
      : {
          method: method || 'get',
          headers: {},
        };

  if (token != null) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  return options;
};

const apiFetch = async (url, args = null) => {
  const method = parseInt(args?.id || 0) > 0 ? 'put' : null;
  const options = getOptions(args, method);

  let res = await fetchFromOrigin(url, options);
  if (res.status === 401) {
    let refreshed = false;
    try {
      refreshed = await refreshToken();
    } catch (err) {
      refreshed = false;
    }

    if (refreshed) {
      options.headers.Authorization = `Bearer ${getToken()}`;
      res = await fetchFromOrigin(url, options);
    } else {
      clearAuth();
    }
  } 
  if (res.status > 299) {
    throw new Error('Error!');
  }

  const json = await res.json();

  return json;
};

export const useApiFetch = (url, args = null, refreshKey = 0) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    apiFetch(url, args).then((res) => setResponse(res));
  }, [url, args, refreshKey]);

  if (typeof response === 'undefined') {
    return null;
  }

  return response;
};

export default apiFetch;
