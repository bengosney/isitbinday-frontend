import { Stack } from '@chakra-ui/react';
import React from 'react';

export const NarrowStack = ({ children, ...props }) => (
  <Stack maxW={{ base: '100%', md: '25rem' }} margin="auto" width="100%" spacing={4} {...props}>
    {children}
  </Stack>
);

export default NarrowStack;
