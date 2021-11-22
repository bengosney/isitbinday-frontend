import React, { useCallback, useEffect, useReducer, useState } from 'react';
import apiFetch, { useApiFetch } from '../utils/apiFetch';
import { List, ListItem, ListIcon, Input, Text, useToast } from '@chakra-ui/react';
import { BiBook, BiUser } from 'react-icons/bi';

import useDebounced from '../utils/useDebounced';

import BarcodeModal from './BarcodeModal';
import BarcodeInput from './BarcodeInput';

import error from '../sounds/error';
import success from '../sounds/success';

const BookList = () => {
  const [debouncedSearch, setSearch, search] = useDebounced('');

  const fetchUrl = `api/books/book/?limit=1000&search=${debouncedSearch}`;
  const apiResults = useApiFetch(fetchUrl);
  const [results, setResults] = useState(apiResults);
  const { results: books = [] } = results || {};
  const toast = useToast();

  const addMessage = (message, status = 'success') => {
    if (status != 'success') {
      const audio = new Audio(error);
      audio.play();
    } else {
      const audio = new Audio(success);
      audio.play();
    }
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
      .catch(() => addMessage(`Failed to add ${barcode}`, 'error'));
  };

  return (
    <>
      <Input placeholder="Search" value={search} onChange={(event) => setSearch(event.target.value)} />
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
