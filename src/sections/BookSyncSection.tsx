import BookSyncForm from '../forms/BookSyncForm';
import useTokens from '../utils/useTokens';
import BookSyncSettingsList from '../widgets/BookSyncSettingsList';
import Modal from '../widgets/Modal';
import { Button, Flex, Heading, Spacer, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { MdAdd } from 'react-icons/md';
import { Route, Routes, useNavigate } from 'react-router-dom';

interface BookSyncSectionProps {
  booksUrl?: string;
}

const BookSyncSection = ({ booksUrl = '/iibd/books' }: BookSyncSectionProps) => {
  const navigate = useNavigate();
  const tokens = useTokens();

  const addUrl = `${booksUrl}/sync/add`;

  return (
    <Stack marginTop={2} gap={4}>
      <Flex align="center" wrap="wrap" gap={2}>
        <Heading fontSize="22px" fontWeight={600} letterSpacing="-.01em">
          Book sync
        </Heading>
        <Spacer />
        <Button size="sm" variant="outline" onClick={() => navigate(booksUrl)}>
          Back to books
        </Button>
        <Button size="sm" colorPalette="brand" onClick={() => navigate(addUrl)}>
          <MdAdd />
          Add sync setting
        </Button>
      </Flex>
      <Text fontSize="13.5px" color={tokens.textMuted}>
        Sync your books with the books.isitbinday.com couchdb instance.
      </Text>
      <BookSyncSettingsList />
      <Routes>
        <Route
          path="add"
          element={
            <Modal open={true} showFooter={false} onClose={() => navigate(-1)} title="Add sync setting">
              <BookSyncForm postSave={() => navigate(-1)} />
            </Modal>
          }
        />
      </Routes>
    </Stack>
  );
};

export default BookSyncSection;
