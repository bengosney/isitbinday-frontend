import React, { useState } from 'react';
import { useRouteMatch, Route, Switch, useHistory } from 'react-router-dom';
import BookList from '../widgets/BookList';
import FAB from '../widgets/FAB';
import { BiBookAdd } from 'react-icons/bi';
import { Heading, Stack } from '@chakra-ui/react';
import usePageTitle from '../utils/usePageTitle';
import BarcodeModal from '../widgets/BarcodeModal';
import apiFetch from '../utils/apiFetch';
import Loader from '../widgets/Loader';

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
      .catch((err) => {
        //console.log('scanning error', err);
        close();
      });
  };

  return (
    <React.Fragment>
      <Switch>
        <Route path={addUrl}>
          <Loader loading={!scanning}>
            <BarcodeModal onScan={(data) => onScan(data)} onClose={close} />
          </Loader>
        </Route>
      </Switch>

      <FAB onClick={() => history.push(addUrl)}>
        <BiBookAdd />
      </FAB>
    </React.Fragment>
  );
};

export default BookModalSection;
