import React from 'react';
import { Spinner, Text, VStack } from '@chakra-ui/core';

const Loader = ({ loading = true, content = 'Loading' }) =>
  loading ? (
    <VStack>
      <Spinner />
      <Text>{content}</Text>
    </VStack>
  ) : null;

export default Loader;
