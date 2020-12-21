import { refreshToken, clearAuth } from '../Auth';
import { useState, useEffect } from 'react';

export const origin = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const _apiFetch = async (url, args = null, method = null) => {
  const token = localStorage.getItem('token');

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

  const cleanUrl = `${url}`.replace(`${origin}/`, '');

  return fetch(`${origin}/${cleanUrl}`, options);
};

const apiFetch = async (url, args = null) => {
  const method = parseInt(args?.id || 0) > 0 ? 'put' : null;

  let res = await _apiFetch(url, args, method);
  if (res.status === 401) {
    try {
      const refreshed = await refreshToken();
      if (refreshed) {
        res = await _apiFetch(url, args, method);
      } else {
        clearAuth();
      }
    } catch (e) {
      window.location.href = '/login';
    }
  }

  if (res.status == 200) {
    const json = await res.json();

    return json;
  }

  throw new Error('Failed to fetch data', res.status);
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
