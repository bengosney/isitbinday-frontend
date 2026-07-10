import apiFetch from '../utils/apiFetch';
import usePageTitle from '../utils/usePageTitle';
import BarcodeModal from '../widgets/BarcodeModal';
import Loader from '../widgets/Loader';
import React, { useState } from 'react';
import { useRouteMatch, Route, Switch, useHistory } from 'react-router-dom';

const BookModalSection = () => {
  usePageTitle('Book List');
  const [scanning, setScanning] = useState(true);
  const { path } = useRouteMatch();

  const getUrl = (slug) => {
    return `${path}/${slug}`.replace('//', '/');
  };

  const addUrl = getUrl('add');

  const history = useHistory();
  const close = () => history.push(path);

  const onScan = (data) => {
    setScanning(false);
    apiFetch(`api/books/book/lookup/${data}/`)
      .then(() => close())
      .catch(() => {
        close();
      });
  };

  return (
    <Switch>
      <Route path={addUrl}>
        <Loader loading={!scanning}>
          <BarcodeModal onScan={(data) => onScan(data)} onClose={close} />
        </Loader>
      </Route>
    </Switch>
  );
};

export default BookModalSection;
