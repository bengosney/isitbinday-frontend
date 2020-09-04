import { authContext, refreshToken } from '../Auth';
import { useState, useEffect } from 'react';

const apiFetch = async (url, args = null) => {
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

  console.log(`fetching ${url} ${token != null ? 'with auth': ''}`);
  const res = await fetch(`http://localhost:8000/${url}`, options);
  if (res.status == 401) {
    console.log('refresh the token');
    const refreshed = await refreshToken();
    console.log('refreshed', refreshed);
    if (refreshed) {
      return apiFetch(url, args);
    }
  }
  const json = await res.json();

  return json;
};

export const useApiFetch = (url, args = null) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    apiFetch(url, args).then((res) => setResponse(res));
  }, [url, args]);

  return response;
};

export default apiFetch;
