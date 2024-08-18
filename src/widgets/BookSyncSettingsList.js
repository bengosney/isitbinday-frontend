import { useApiFetch } from '../utils/apiFetch';
import Loader from './Loader';
import { Stack, ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';

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
