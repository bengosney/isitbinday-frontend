import React from 'react';
import apiFetch, { useApiFetch } from '../utils/apiFetch';
import { Stack, ListItem, ListIcon, OrderedList, UnorderedList, Heading, Text, Box } from '@chakra-ui/react';
import Loader from './Loader';

const BookSyncSettingsList = () => {
  const url = 'api/books/sync/';
  const data = useApiFetch(url);

  if (data === null) {
    return <Loader />;
  }

  const { results } = data;

  return (
    <Stack>
      <UnorderedList>
        {results.map((settings) => (
          <ListItem key={settings.id}>
            {settings.server} - {settings.database}
          </ListItem>
        ))}
      </UnorderedList>
    </Stack>
  );
};

export default BookSyncSettingsList;
