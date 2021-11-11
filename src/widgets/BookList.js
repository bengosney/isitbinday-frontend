import React, { useCallback, useEffect, useReducer, useState } from 'react';
import apiFetch, { useApiFetch } from '../utils/apiFetch';
import { List, ListItem, ListIcon, OrderedList, UnorderedList, Text } from '@chakra-ui/react';
import { BiBook, BiUser } from 'react-icons/bi';

import BarcodeModal from './BarcodeModal';
import BarcodeInput from './BarcodeInput';

const BookList = () => {
  const apiResults = useApiFetch('api/books/book/');
  const [results, setResults] = useState(apiResults);
  const { results: books = [] } = results || {};

  useEffect(() => {
    setResults(apiResults);
  }, [apiResults])

  const onScan = (barcode) => {
    apiFetch(`api/books/book/lookup/${barcode}/`)
      .then(() => apiFetch('api/books/book/'))
      .then((res) => setResults(res));
  };

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
      <BarcodeInput onScan={(barcode) => onScan(barcode)} />
    </>
  );
};

export default BookList;
