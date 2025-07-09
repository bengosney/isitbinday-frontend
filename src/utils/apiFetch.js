import { getConfig } from '../config';
import { db } from '../db';
import { useState, useEffect } from 'react';

export const origin = process.env.REACT_APP_API_URL || getConfig('api_origin', 'http://localhost:8000'); // eslint-disable-line no-undef

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

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}

export const makeKey = async (url, args) => {
  const data = `${url}:${JSON.stringify(args)}`;
  const hash = await sha256(data);

  return `${hash}`.substr(0, 10);
};

export const apiFetch = async (url, args = null, method = null) => {
  const _method = parseInt(args?.id || 0) > 0 ? 'put' : null;
  const options = getOptions(args, method || _method);

  window.fetching = (window.fetching || 0) + 1;
  if (window.fetching == 1) {
    window.dispatchEvent(new CustomEvent('fetching', { detail: true }));
  }

  let res = await fetchFromOrigin(url, options);
  if (res.status === 401) {
    let refreshed = false;
    try {
      refreshed = await refreshToken();
    } catch {
      refreshed = false;
    }

    if (refreshed) {
      options.headers.Authorization = `Bearer ${getToken()}`;
      res = await fetchFromOrigin(url, options);
    } else {
      clearAuth();
    }
  }

  window.fetching -= 1;
  if (window.fetching === 0) {
    window.dispatchEvent(new CustomEvent('fetching', { detail: false }));
  }

  if (res.status > 299) {
    throw new Error(`Error: ${res.status}`);
  }

  if (res.status === 204) {
    return null; // No content
  }

  return await res.json();
};

export const useApiFetch = (url, args = null, refreshKey = 0, key = null) => {
  const [localResponse, setLocalResponse] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [response, setResponse] = useState(null);
  const [_key, setKey] = useState(null);

  useEffect(() => {
    if (_key !== null && response != null) {
      db.upsert(`${_key}`, () => ({ data: response }));
    }
  }, [response, _key]);

  useEffect(() => {
    if (key !== null) {
      setKey(key);
    } else {
      makeKey(url, key).then((k) => setKey(k));
    }
  }, [key, url, args]);

  useEffect(() => {
    if (_key !== null) {
      db.get(`${_key}`).then(({ data }) => setLocalResponse(data));
    }
  }, [_key]);

  useEffect(() => {
    apiFetch(url, args).then((res) => setApiResponse(res));
  }, [url, args, refreshKey]);

  useEffect(() => {
    setResponse(apiResponse || localResponse);
  }, [apiResponse, localResponse]);

  if (typeof response === 'undefined') {
    return null;
  }

  return response;
};

export default apiFetch;
