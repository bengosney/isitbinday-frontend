import error from '../sounds/error';
import success from '../sounds/success';
import apiFetch, { useApiFetch } from '../utils/apiFetch';
import useDebounced from '../utils/useDebounced';
import useTokens from '../utils/useTokens';
import BarcodeInput from './BarcodeInput';
import { toaster } from '../utils/toaster';
import { Grid, Input, Stack, Text, IconButton, HStack, NativeSelect, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiBook, BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

interface BookListProps {
  page?: number;
}

const BookList = ({ page = 0 }: BookListProps) => {
  const tokens = useTokens();
  const [npp, _setNpp] = useState(50);
  const npps = [5, 10, 25, 50, 100];

  const [offset, setOffset] = useState(page * npp);
  const [count, setCount] = useState(0);

  const setNpp = (n: string | number) => {
    _setNpp(parseInt(`${n}`));
    setOffset(0);
  };

  const currentPage = Math.floor(offset / npp);
  const totalPages = Math.ceil(count / npp);

  const [debouncedSearch, setSearch, search] = useDebounced('');

  useEffect(() => {
    setOffset(0);
  }, [debouncedSearch]);

  const fetchUrl = `api/books/book/?limit=${npp}&offset=${offset}&search=${debouncedSearch}`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apiResults = useApiFetch(fetchUrl) as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any>(apiResults);
  const { results: books = [] } = results || {};
  const addMessage = (message: string, status = 'success') => {
    if (status !== 'success') {
      const audio = new Audio(error);
      audio.play();
    } else {
      const audio = new Audio(success);
      audio.play();
    }
    toaster.create({
      title: message,
      type: status,
      duration: 2000,
    });
  };

  useEffect(() => {
    setResults(apiResults);
    if (apiResults !== null) {
      setCount(apiResults.count);
    }
  }, [apiResults]);

  const onScan = (barcode: string) => {
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
          aria-label="Previous page"
          size={'sm'}
          variant={'outline'}
          onClick={() => setOffset((o) => o - npp)}
          disabled={offset - npp < 0}
        >
          <BiLeftArrowAlt />
        </IconButton>
        <Text fontFamily="mono" fontSize="11px" color={tokens.textMuted}>
          {currentPage + 1}&nbsp;of&nbsp;{Math.max(totalPages, 1)}
        </Text>
        <IconButton
          aria-label="Next page"
          size={'sm'}
          variant={'outline'}
          onClick={() => setOffset((o) => o + npp)}
          disabled={offset + npp >= count}
        >
          <BiRightArrowAlt />
        </IconButton>
      </HStack>
      <HStack gap={2}>
        <NativeSelect.Root size={'xs'} width="auto">
          <NativeSelect.Field value={npp} onChange={(e) => setNpp(e.target.value)}>
            {npps.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
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
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {books.map((book: any) => (
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
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {book.authors.map((author: any) => author.name).join(', ')}
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
