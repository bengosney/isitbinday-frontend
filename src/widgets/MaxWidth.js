import { Box } from '@chakra-ui/react';
import React from 'react';

const MaxWidth = ({ children, ...props }) => (
  <Box maxWidth={{ base: '100%', md: '90vw' }} width={'100%'} margin="auto" paddingX={4} {...props}>
    {children}
  </Box>
);

export default MaxWidth;
