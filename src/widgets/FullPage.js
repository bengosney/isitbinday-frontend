import MaxWidth from './MaxWidth';
import { Stack, Box } from '@chakra-ui/react';
import React from 'react';

export const FullPage = ({ children, ...props }) => (
  <MaxWidth>
    <Stack margin={'auto'} minHeight={'100vh'} justify={'center'} {...props}>
      {children}
    </Stack>
  </MaxWidth>
);

export default FullPage;
