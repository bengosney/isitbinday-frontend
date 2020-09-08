import { refreshToken } from '../Auth';
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

  const res = await fetch(`http://localhost:8000/${url}`, options);
  if (res.status === 401) {
    const refreshed = await refreshToken();
    if (refreshed) {
      return apiFetch(url, args);
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

  return response;
};

export default apiFetch;
