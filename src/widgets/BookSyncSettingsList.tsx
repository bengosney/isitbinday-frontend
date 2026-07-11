import { useApiFetch } from '../utils/apiFetch';
import useTokens from '../utils/useTokens';
import Loader from './Loader';
import { Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';

const BookSyncSettingsList = () => {
  const tokens = useTokens();
  const url = 'api/books/sync/';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = useApiFetch(url) as any;

  if (data === null) {
    return <Loader />;
  }

  const { results } = data;

  return (
    <Stack gap={2.5}>
      {results.length === 0 && <Text color={tokens.textDim}>No sync settings yet</Text>}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {results.map((settings: any) => (
        <Flex
          key={settings.id}
          align="center"
          gap={3}
          background={tokens.surface}
          border="1px solid"
          borderColor={tokens.border}
          borderRadius="10px"
          paddingX="15px"
          paddingY="13px"
        >
          <Text fontSize="14px" fontWeight={500} wordBreak="break-word">
            {settings.server}
          </Text>
          <Text
            marginLeft="auto"
            fontFamily="mono"
            fontSize="10.5px"
            color={tokens.accentText}
            background={tokens.accentSoft}
            paddingX={2}
            paddingY="2px"
            borderRadius="full"
            flex="none"
          >
            {settings.database}
          </Text>
        </Flex>
      ))}
    </Stack>
  );
};

export default BookSyncSettingsList;
