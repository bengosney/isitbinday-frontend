import { useEffect } from 'react';

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = [title, 'Is it bin day?'].filter((i) => (i ? true : false)).join(' | ');
  }, [title]);
};

export default usePageTitle;
