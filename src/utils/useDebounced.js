import { useEffect, useState } from 'react';

const useDebounced = (inital, delay = 50) => {
  const [current, setCurrent] = useState(inital);
  const [debounced, setDebounced] = useState(current);
  const [timeoutHandle, setTimeoutHandle] = useState(null);

  useEffect(() => {
      clearTimeout(timeoutHandle);
      setTimeoutHandle(setTimeout(() => setDebounced(current), delay));
  }, [current]);

  return [debounced, setCurrent, current];
};

export default useDebounced;
