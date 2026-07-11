import apiFetch from '../utils/apiFetch';
import usePageTitle from '../utils/usePageTitle';
import BarcodeModal from '../widgets/BarcodeModal';
import Loader from '../widgets/Loader';
import React, { useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

const BookModalSection = () => {
  usePageTitle('Book List');
  const [scanning, setScanning] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const close = () => navigate(pathname.replace(/\/add\/?$/, ''));

  const onScan = (data: string) => {
    setScanning(false);
    apiFetch(`api/books/book/lookup/${data}/`)
      .then(() => close())
      .catch(() => {
        close();
      });
  };

  return (
    <Routes>
      <Route
        path="add"
        element={
          <Loader loading={!scanning}>
            <BarcodeModal onScan={(data) => onScan(data)} />
          </Loader>
        }
      />
    </Routes>
  );
};

export default BookModalSection;
