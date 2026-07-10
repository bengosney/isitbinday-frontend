import useTokens from '../utils/useTokens';
import Portal from './Portal';
import { Box } from '@chakra-ui/react';
import React from 'react';

const FAB = ({ children, ...props }) => {
  const tokens = useTokens();
  return (
    <Portal>
      <Box
        as="button"
        position={'fixed'}
        bottom={'1rem'}
        right={'1rem'}
        fontSize={'2.5rem'}
        padding={'.5rem'}
        color={tokens.onAccent}
        background={tokens.accent}
        borderRadius={'50%'}
        boxShadow={'lg'}
        cursor={'pointer'}
        _hover={{ boxShadow: 'dark-lg' }}
        {...props}
      >
        {children}
      </Box>
    </Portal>
  );
};

export default FAB;
