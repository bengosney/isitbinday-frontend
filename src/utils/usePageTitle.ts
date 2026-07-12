import { useEffect } from 'react';

const usePageTitle = (title?: string | null): void => {
  useEffect(() => {
    document.title = [title, 'Is it bin day?'].filter((i) => (i ? true : false)).join(' | ');
  }, [title]);
};

export default usePageTitle;
