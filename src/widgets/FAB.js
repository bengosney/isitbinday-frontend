import { Box } from '@chakra-ui/core';
import React from 'react';
import Portal from './Portal';

const FAB = ({ children, ...props }) => {
  return (
    <Portal>
      <Box
        position={'fixed'}
        bottom={'1rem'}
        right={'1rem'}
        fontSize={'3rem'}
        color={'white'}
        background={'brand.500'}
        borderRadius={'50%'}
        boxShadow={'lg'}
        _hover={{ boxShadow: 'dark-lg' }}
        {...props}
      >
        {children}
      </Box>
    </Portal>
  );
};

export default FAB;