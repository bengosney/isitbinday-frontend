import { authContext } from '../Auth';

const apiFetch = async (url, args = null) => {
  const token = localStorage.getItem('token');
  console.log('token', token);
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
    options.headers.Authorization = `JWT ${token}`;
  }

  const res = await fetch(`http://localhost:8000/${url}`, options);
  const json = await res.json();

  return json;
};

export default apiFetch;
