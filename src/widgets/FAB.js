import Portal from './Portal';
import { Box } from '@chakra-ui/react';
import React from 'react';

const FAB = ({ children, ...props }) => {
  return (
    <Portal>
      <Box
        position={'fixed'}
        bottom={'1rem'}
        right={'1rem'}
        fontSize={'2.5rem'}
        padding={'.5rem'}
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
