import React, { useCallback, useEffect, useReducer, useState } from 'react';
import apiFetch, { useApiFetch } from '../utils/apiFetch';
import { List, ListItem, ListIcon, OrderedList, UnorderedList, Text, useToast } from '@chakra-ui/react';
import { BiBook, BiUser } from 'react-icons/bi';

import BarcodeModal from './BarcodeModal';
import BarcodeInput from './BarcodeInput';

const BookList = () => {
  const fetchUrl = 'api/books/book/?limit=100';
  const apiResults = useApiFetch(fetchUrl);
  const [results, setResults] = useState(apiResults);
  const { results: books = [] } = results || {};
  const toast = useToast()

  const addMessage = (message, status = "success") => {
    toast({
      title: message,
      status: status,
      duration: 2000,
      isClosable: true,
    });    
  };

  useEffect(() => {
    setResults(apiResults);
  }, [apiResults]);

  const onScan = (barcode) => {
    addMessage(`Scanned ${barcode}`);
    apiFetch(`api/books/book/lookup/${barcode}/`)
      .then(() => apiFetch(fetchUrl))
      .then((res) => setResults(res))
      .then(() => addMessage(`Added ${barcode}`))
      .catch(() => addMessage(`Failed to add ${barcode}`, "error"));
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
