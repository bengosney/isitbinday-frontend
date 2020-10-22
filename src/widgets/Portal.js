import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
  const element = useRef(document.createElement('div'));

  useEffect(() => {
    const { current } = element;
    document.body.appendChild(current);

    return () => current.remove();
  }, []);

  return createPortal(children, element.current);
};

export default Portal;