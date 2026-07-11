import usePageTitle from '../utils/usePageTitle';
import BookList from '../widgets/BookList';
import BookModalSection from './BookModalSection';
import BookSyncSection from './BookSyncSection';
import { Button, Flex, Heading, Spacer, Stack } from '@chakra-ui/react';
import React from 'react';
import { BiBookAdd } from 'react-icons/bi';
import { Route, Routes, useNavigate } from 'react-router-dom';

const BASE_URL = '/iibd/books';

const BookSection = () => {
  usePageTitle('Library');
  const navigate = useNavigate();

  const listUrl = BASE_URL;
  const syncUrl = `${BASE_URL}/sync`;
  const addUrl = `${BASE_URL}/add`;

  return (
    <Routes>
      <Route path="sync/*" element={<BookSyncSection booksUrl={listUrl} />} />
      <Route
        path="*"
        element={
          <>
            <Flex align="center" mt={2} wrap="wrap" gap={2}>
              <Heading fontSize="22px" fontWeight={600} letterSpacing="-.01em">
                Books
              </Heading>
              <Spacer />
              <Button size="sm" variant="outline" onClick={() => navigate(syncUrl)}>
                Sync settings
              </Button>
              <Button size="sm" colorPalette="brand" onClick={() => navigate(addUrl)}>
                <BiBookAdd />
                Add book
              </Button>
            </Flex>
            <Stack my={6}>
              <BookList />
            </Stack>
            <BookModalSection />
          </>
        }
      />
    </Routes>
  );
};

export default BookSection;
