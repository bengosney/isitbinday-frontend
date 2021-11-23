import React, { useCallback, useEffect, useReducer, useState } from 'react';
import apiFetch, { useApiFetch } from '../utils/apiFetch';
import { List, ListItem, ListIcon, Input, Text, useToast, Button, Stack, HStack } from '@chakra-ui/react';
import { BiBook, BiUser } from 'react-icons/bi';

import useDebounced from '../utils/useDebounced';

import BarcodeModal from './BarcodeModal';
import BarcodeInput from './BarcodeInput';

import error from '../sounds/error';
import success from '../sounds/success';

const BookList = ({page = 0}) => {
  const npp = 50;

  const [offset, setOffset] = useState(page * npp);
  const [count, setCount] = useState(0);

  const currentPage = Math.floor(offset / npp);
  const totalPages = Math.ceil(count / npp);

  const [debouncedSearch, setSearch, search] = useDebounced('');

  const fetchUrl = `api/books/book/?limit=${npp}&offset=${offset}&search=${debouncedSearch}`;
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
    if (apiResults !== null) {
      setCount(apiResults.count);
    }
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
      <HStack hidden={totalPages < 1}>
        <Button onClick={() => setOffset((o) => o - npp)} disabled={offset - npp < 0}>
          Prev
        </Button>
        <Text>{currentPage + 1} of {totalPages}</Text>
        <Button onClick={() => setOffset((o) => o + npp)} disabled={offset + npp >= count}>
          Next
        </Button>
      </HStack>
      <BarcodeInput onScan={(barcode) => onScan(barcode)} />
    </>
  );
};

export default BookList;
