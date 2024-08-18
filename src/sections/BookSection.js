import React from 'react';
import usePageTitle from '../utils/usePageTitle';
import BookList from '../widgets/BookList';
import BookModalSection from './BookModalSection';
import { Heading, Stack } from '@chakra-ui/react';
import { useRouteMatch, Route, Switch, Link } from 'react-router-dom';
import BookSyncSection from './BookSyncSection';

const BookSection = () => {
  usePageTitle('Library');
  const { path } = useRouteMatch();

  const getUrl = (slug) => {
    return `${path}/${slug}`.replace('//', '/');
  };

  const listUrl = getUrl('');
  const syncUrl = getUrl('sync');

  return (
    <React.Fragment>
      <Heading>Books</Heading>
      <Stack direction={"row"}>
        <Link to={listUrl}>List</Link>
        <Link to={syncUrl}>Sync Settings</Link>
      </Stack>
      <Switch>
        <Route path={syncUrl}>
          <BookSyncSection />
        </Route>
        <Route path={listUrl}>
          <Stack my={6}>
            <BookList />
          </Stack>
          <BookModalSection />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default BookSection;
