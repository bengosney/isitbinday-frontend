import React from 'react';
import { Box } from '@chakra-ui/react';

const MaxWidth = ({ children, ...props }) => (
  <Box maxWidth={{base: "100%", md: "90vw"}} margin="auto" paddingX={4} {...props}>
    {children}
  </Box>
);

export default MaxWidth;
