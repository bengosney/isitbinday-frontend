import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

export const NavItem = ({ children, active = false, ...props }) => (
  <Box mx={1}>
    <div>
      <Box px={3} py={1} textDecoration={active ? 'underline' : ''} _hover={{ color: 'brand.100' }} {...props}>
        {children}
      </Box>
    </div>
  </Box>
);

const Nav = ({ children, ...props }) => (
  <Box overflowX={'auto'} bg="brand.600">
    <Flex as="nav" align="center" padding={2} color="white" {...props}>
      {children}
    </Flex>
  </Box>
);

Nav.Item = NavItem;

export default Nav;
