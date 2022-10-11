import React from 'react';
import { Box } from '@chakra-ui/react';

const MaxWidth = ({ children, ...props }) => (
  <Box maxWidth="1024px" margin="auto" paddingX={4} {...props}>
    {children}
  </Box>
);

export default MaxWidth;
