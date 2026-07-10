import error from '../sounds/error';
import success from '../sounds/success';
import apiFetch, { useApiFetch } from '../utils/apiFetch';
import useDebounced from '../utils/useDebounced';
import useTokens from '../utils/useTokens';
import BarcodeInput from './BarcodeInput';
import { Grid, Input, Stack, Text, useToast, IconButton, HStack, Select, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiBook, BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

const BookList = ({ page = 0 }) => {
  const tokens = useTokens();
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
    if (status !== 'success') {
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

  const pagi = (
    <Flex justify={'space-between'} align={'center'} wrap="wrap" gap={2}>
      <HStack hidden={totalPages < 1} align={'center'} gap={2}>
        <IconButton
          icon={<BiLeftArrowAlt />}
          aria-label="Previous page"
          size={'sm'}
          variant={'outline'}
          onClick={() => setOffset((o) => o - npp)}
          disabled={offset - npp < 0}
        />
        <Text fontFamily="mono" fontSize="11px" color={tokens.textMuted}>
          {currentPage + 1}&nbsp;of&nbsp;{Math.max(totalPages, 1)}
        </Text>
        <IconButton
          icon={<BiRightArrowAlt />}
          aria-label="Next page"
          size={'sm'}
          variant={'outline'}
          onClick={() => setOffset((o) => o + npp)}
          disabled={offset + npp >= count}
        />
      </HStack>
      <HStack gap={2}>
        <Select size={'xs'} width="auto" value={npp} onChange={(e) => setNpp(e.target.value)}>
          {npps.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </Select>
        <Text fontFamily="mono" fontSize="11px" color={tokens.textDim}>
          per&nbsp;page
        </Text>
      </HStack>
    </Flex>
  );

  return (
    <Stack gap={4}>
      <Input placeholder="Search books" value={search} onChange={(event) => setSearch(event.target.value)} />
      {pagi}
      {apiResults !== null && books.length === 0 && <Text color={tokens.textDim}>No books found</Text>}
      <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4}>
        {books.map((book) => (
          <Flex
            key={book.isbn}
            align="flex-start"
            gap={3}
            background={tokens.surface}
            border="1px solid"
            borderColor={tokens.border}
            borderRadius="14px"
            paddingX={5}
            paddingY={4}
          >
            <Flex
              width="32px"
              height="32px"
              borderRadius="9px"
              background={tokens.accentSoft}
              color={tokens.accentText}
              align="center"
              justify="center"
              flex="none"
              fontSize="16px"
            >
              <BiBook />
            </Flex>
            <Stack gap={1} minW={0}>
              <Text fontSize="14px" fontWeight={600} lineHeight={1.4} wordBreak="break-word">
                {book.title}
              </Text>
              <Text fontSize="12.5px" color={tokens.textMuted} wordBreak="break-word">
                {book.authors.map((author) => author.name).join(', ')}
              </Text>
            </Stack>
          </Flex>
        ))}
      </Grid>
      {pagi}
      <BarcodeInput onScan={(barcode) => onScan(barcode)} />
    </Stack>
  );
};

export default BookList;
