import { refreshToken, clearAuth } from '../Auth';
import { useState, useEffect } from 'react';

//export const origin = process.env.REACT_APP_API_URL || 'http://localhost:8000';
export const origin = 'http://192.168.1.108:8000';

const _apiFetch = (url, args = null, method = null) => {
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
  //options.mode = 'no-cors';

  const cleanUrl = `${url}`.replace(`${origin}/`, '');
  console.log('fetching', `${origin}/${cleanUrl}`, options);
  return fetch(`${origin}/${cleanUrl}`, options);
};

const apiFetch = async (url, args = null) => {
  const method = parseInt(args?.id || 0) > 0 ? 'put' : null;

  let res = await _apiFetch(url, args, method);
  if (res.status === 401) {
    console.log('trying refresh');
    const refreshed = await refreshToken();
    if (refreshed) {
      console.log('retrying request', url);
      res = await _apiFetch(url, args, method);
    } else {
      console.log('failed refesh');
      clearAuth();
    }
  }

  if (!res.ok) {
    return null;
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
