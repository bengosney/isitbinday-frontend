import React, { useCallback, useEffect, useReducer } from 'react';
import apiFetch, { useApiFetch } from '../utils/apiFetch';
import { List, ListItem, ListIcon, OrderedList, UnorderedList, Text } from '@chakra-ui/react';
import { BiBook, BiUser } from 'react-icons/bi';

import BarcodeModal from './BarcodeModal';

const BookList = () => {
  const apiResults = useApiFetch('api/books/book/');
  const { results: books = [] } = apiResults || {};

  return (
    <>
      <List>
        {books.map((book) => (
          <ListItem key={book.isbn}>
            <Text fontSize="lg">
              <ListIcon as={BiBook} color="green.500" />
              {book.title}
            </Text>
            <Text fontSize="sm">{book.authors.map((author) => author.name).join(', ')}</Text>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default BookList;
