import { useEffect, useState } from 'react';

const useDebounced = (inital, delay = 50) => {
  const [current, setCurrent] = useState(inital);
  const [debounced, setDebounced] = useState(current);

  useEffect(() => {
    const handle = setTimeout(() => setDebounced(current), delay);
    return () => clearTimeout(handle);
  }, [current]);

  return [debounced, setCurrent, current];
};

export default useDebounced;
