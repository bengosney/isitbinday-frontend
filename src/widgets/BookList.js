import error from '../sounds/error';
import success from '../sounds/success';
import apiFetch, { useApiFetch } from '../utils/apiFetch';
import useDebounced from '../utils/useDebounced';
import BarcodeInput from './BarcodeInput';
import {
  List,
  ListItem,
  ListIcon,
  Input,
  Text,
  useToast,
  Button,
  IconButton,
  Image,
  HStack,
  Select,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiBook, BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

const BookList = ({ page = 0 }) => {
  const [npp, _setNpp] = useState(50);
  const npps = [5, 10, 25, 50, 100];

  const [offset, setOffset] = useState(page * npp);
  const [count, setCount] = useState(0);

  const setNpp = (n) => {
    _setNpp(parseInt(n));
    setOffset(0);
  };

  const currentPage = Math.floor(offset / npp);
  const totalPages = Math.ceil(count / npp);

  const [debouncedSearch, setSearch, search] = useDebounced('');

  useEffect(() => {
    setOffset(0);
  }, [debouncedSearch]);

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

  const nppSize = 'xs';
  const pagiSize = 'sm';
  const pagi = (
    <HStack justify={'space-between'}>
      <HStack hidden={totalPages < 1} align={'center'}>
        <IconButton
          icon={<BiLeftArrowAlt />}
          aria-label="Previous page"
          size={pagiSize}
          onClick={() => setOffset((o) => o - npp)}
          disabled={offset - npp < 0}
        />
        <Text size={pagiSize}>
          {currentPage + 1}&nbsp;of&nbsp;{totalPages}
        </Text>
        <IconButton
          icon={<BiRightArrowAlt />}
          aria-label="Next page"
          size={pagiSize}
          onClick={() => setOffset((o) => o + npp)}
          disabled={offset + npp >= count}
        />
      </HStack>
      <HStack>
        <Select size={nppSize} value={npp} onChange={(e) => setNpp(e.target.value)}>
          {npps.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </Select>
        <Text size={nppSize}>Per&nbsp;Page</Text>
      </HStack>
    </HStack>
  );

  return (
    <>
      <Input placeholder="Search" value={search} onChange={(event) => setSearch(event.target.value)} />
      {pagi}
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
      {pagi}
      <BarcodeInput onScan={(barcode) => onScan(barcode)} />
    </>
  );
};

export default BookList;
