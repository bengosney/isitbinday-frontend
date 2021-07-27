import React from 'react';
import { useRouteMatch, Route, Switch, useHistory } from 'react-router-dom';
import BookList from '../widgets/BookList';
import FAB from '../widgets/FAB';
import { MdAdd } from 'react-icons/md';
import { Heading, Stack } from '@chakra-ui/react';
import usePageTitle from '../utils/usePageTitle';

import BookModalSection from './BookModalSection';

const BookSection = () => {
  usePageTitle('Library');
  const { path } = useRouteMatch();

  const getUrl = (slug) => {
    return `${path}/${slug}`.replace('//', '/');
  };

  const listUrl = getUrl('');
  const addUrl = getUrl('add');
  const newUrl = getUrl('new');

  const history = useHistory();

  return (
    <React.Fragment>
      <Heading>Books</Heading>
      <Switch>
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
