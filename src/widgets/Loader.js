import React from 'react';
import { Box, Spinner, Text, VStack } from '@chakra-ui/react';

const Loader = ({ loading = true, content = 'Loading', children = false }) => {
  const spinner = (
    <VStack>
      <Spinner />
      <Text>{content}</Text>
    </VStack>
  );

  if (children) {
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
            {spinner}
          </Box>
        )}
      </Box>
    );
  }

  return loading ? spinner : null;
};

export default Loader;
