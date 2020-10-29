import React from 'react';
import { Box, Spinner, Text, VStack } from '@chakra-ui/core';

const Loader = ({ loading = true, content = 'Loading', children = false }) => {
  if (children !== null) {
    return (
      <Box position={'relative'}>
        {children}
        {loading && (
          <Box
            position={'absolute'}
            top={0}
            left={0}
            right={0}
            bottom={0}
            background={'whiteAlpha.800'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <VStack>
              <Spinner />
              <Text>{content}</Text>
            </VStack>
          </Box>
        )}
      </Box>
    );
  }

  return loading ? (
    <VStack>
      <Spinner />
      <Text>{content}</Text>
    </VStack>
  ) : null;
};

export default Loader;
