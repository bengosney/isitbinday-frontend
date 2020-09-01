const apiFetch = async (url, args = null) => {
  const options =
    args != null
      ? {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(args),
        }
      : {};

  const res = await fetch(`http://localhost:8000/${url}`, options);
  const json = await res.json();

  return json;
};

export default apiFetch;
