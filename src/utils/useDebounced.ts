import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

const useDebounced = <T>(inital: T, delay = 50): [T, Dispatch<SetStateAction<T>>, T] => {
  const [current, setCurrent] = useState<T>(inital);
  const [debounced, setDebounced] = useState<T>(current);

  useEffect(() => {
    const handle = setTimeout(() => setDebounced(current), delay);
    return () => clearTimeout(handle);
  }, [current, delay]);

  return [debounced, setCurrent, current];
};

export default useDebounced;
