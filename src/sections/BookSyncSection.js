import BookSyncForm from '../forms/BookSyncForm';
import BookSyncSettingsList from '../widgets/BookSyncSettingsList';
import FAB from '../widgets/FAB';
import Modal from '../widgets/Modal';
import { Stack, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { MdAdd } from 'react-icons/md';
import { useRouteMatch, Route, Switch, useHistory } from 'react-router-dom';

const BookSyncSection = () => {
  const { path } = useRouteMatch();
  const history = useHistory();

  const getUrl = (slug) => {
    return `${path}/${slug}`.replace('//', '/');
  };

  const addUrl = getUrl('/add');

  return (
    <Stack paddingTop={4}>
      <Heading as={'h2'} fontSize={'1.5em'}>
        Book Sync
      </Heading>
      <Text>Sync your books with books.isitbinday.com couchdb instance</Text>
      <BookSyncSettingsList />
      <FAB onClick={() => history.push(addUrl)}>
        <MdAdd />
      </FAB>
      <Switch>
        <Route path={addUrl}>
          <Modal isOpen={true} showFooter={false} onClose={() => history.goBack()} title="Add Sync Setting">
            <BookSyncForm postSave={() => history.goBack()} />
          </Modal>
        </Route>
      </Switch>
    </Stack>
  );
};

export default BookSyncSection;
