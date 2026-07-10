import usePageTitle from '../utils/usePageTitle';
import BookList from '../widgets/BookList';
import BookModalSection from './BookModalSection';
import BookSyncSection from './BookSyncSection';
import { Button, Flex, Heading, Spacer, Stack } from '@chakra-ui/react';
import React from 'react';
import { BiBookAdd } from 'react-icons/bi';
import { useRouteMatch, Route, Switch, useHistory } from 'react-router-dom';

const BookSection = () => {
  usePageTitle('Library');
  const { path } = useRouteMatch();
  const history = useHistory();

  const getUrl = (slug) => {
    return slug ? `${path}/${slug}`.replace('//', '/') : path;
  };

  const listUrl = getUrl('');
  const syncUrl = getUrl('sync');
  const addUrl = getUrl('add');

  return (
    <Switch>
      <Route path={syncUrl}>
        <BookSyncSection booksUrl={listUrl} />
      </Route>
      <Route path={listUrl}>
        <Flex align="center" mt={2} wrap="wrap" gap={2}>
          <Heading fontSize="22px" fontWeight={600} letterSpacing="-.01em">
            Books
          </Heading>
          <Spacer />
          <Button size="sm" variant="outline" onClick={() => history.push(syncUrl)}>
            Sync settings
          </Button>
          <Button size="sm" colorPalette="brand" onClick={() => history.push(addUrl)}>
            <BiBookAdd />Add book
          </Button>
        </Flex>
        <Stack my={6}>
          <BookList />
        </Stack>
        <BookModalSection />
      </Route>
    </Switch>
  );
};

export default BookSection;
