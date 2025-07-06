import MaxWidth from './MaxWidth';
import { Stack, Box } from '@chakra-ui/react';
import React from 'react';

export const FullPage = ({ children, ...props }) => (
  <Stack
    maxWidth={{ base: '100%', md: '90vw' }}
    width={'100%'}
    margin="auto"
    padding={4}
    minHeight={'60vh'}
    justify={'center'}
    {...props}
  >
    {children}
  </Stack>
);

export default FullPage;
