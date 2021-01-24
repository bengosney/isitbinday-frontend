import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

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
  <Flex as="nav" align="center" padding={2} bg="brand.600" color="white" {...props}>
    {children}
  </Flex>
);

Nav.Item = NavItem;

export default Nav;
