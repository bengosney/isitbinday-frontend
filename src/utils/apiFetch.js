import { refreshToken, clearAuth } from '../Auth';
import { useState, useEffect } from 'react';

export const origin = 'http://localhost:8000';

const _apiFetch = async (url, args = null) => {
  const token = localStorage.getItem('token');

  const options =
    args != null
      ? {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(args),
        }
      : {
          headers: {},
        };

  if (token != null) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${origin}/${url}`, options);
};

const apiFetch = async (url, args = null) => {
  let res = await _apiFetch(url, args);
  if (res.status === 401) {
    console.log('trying refresh');
    const refreshed = await refreshToken();
    if (refreshed) {
      console.log('retrying request', url);
      res = await _apiFetch(url, args);
    } else {
      console.log('failed refesh');
      clearAuth();
    }
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
