import BookSyncForm from '../forms/BookSyncForm';
import useTokens from '../utils/useTokens';
import BookSyncSettingsList from '../widgets/BookSyncSettingsList';
import Modal from '../widgets/Modal';
import { Button, Flex, Heading, Spacer, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { MdAdd } from 'react-icons/md';
import { useRouteMatch, Route, Switch, useHistory } from 'react-router-dom';

const BookSyncSection = ({ booksUrl = '/iibd/books' }) => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const tokens = useTokens();

  const getUrl = (slug) => {
    return `${path}/${slug}`.replace('//', '/');
  };

  const addUrl = getUrl('/add');

  return (
    <Stack marginTop={2} spacing={4}>
      <Flex align="center" wrap="wrap" gridGap={2}>
        <Heading fontSize="22px" fontWeight={600} letterSpacing="-.01em">
          Book sync
        </Heading>
        <Spacer />
        <Button size="sm" variant="outline" onClick={() => history.push(booksUrl)}>
          Back to books
        </Button>
        <Button size="sm" colorScheme="brand" leftIcon={<MdAdd />} onClick={() => history.push(addUrl)}>
          Add sync setting
        </Button>
      </Flex>
      <Text fontSize="13.5px" color={tokens.textMuted}>
        Sync your books with the books.isitbinday.com couchdb instance.
      </Text>
      <BookSyncSettingsList />
      <Switch>
        <Route path={addUrl}>
          <Modal isOpen={true} showFooter={false} onClose={() => history.goBack()} title="Add sync setting">
            <BookSyncForm postSave={() => history.goBack()} />
          </Modal>
        </Route>
      </Switch>
    </Stack>
  );
};

export default BookSyncSection;
