import useTokens from '../utils/useTokens';
import LogoMark from './LogoMark';
import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

export const NavItem = ({ children, active = false, ...props }) => {
  const tokens = useTokens();
  return (
    <Box
      px={3}
      py={1.5}
      borderRadius="7px"
      fontSize="13px"
      fontWeight={active ? 600 : 500}
      color={active ? tokens.text : tokens.textMuted}
      background={active ? tokens.hoverBg : 'transparent'}
      whiteSpace="nowrap"
      _hover={{ color: tokens.text }}
      {...props}
    >
      {children}
    </Box>
  );
};

export const NavBrand = () => {
  const tokens = useTokens();
  return (
    <Flex align="center" gap={2.5} flex="none" mr={4}>
      <LogoMark />
      <Text fontSize="14px" fontWeight={600} color={tokens.text} whiteSpace="nowrap">
        Is it bin day?
      </Text>
    </Flex>
  );
};

const Nav = ({ children, ...props }) => {
  const tokens = useTokens();
  return (
    <Box overflowX="auto" background={tokens.topbarBg} borderBottom="1px solid" borderBottomColor={tokens.border}>
      <Flex as="nav" align="center" height="56px" px={{ base: 4, md: 10 }} gap={1.5} {...props}>
        {children}
      </Flex>
    </Box>
  );
};

Nav.Item = NavItem;
Nav.Brand = NavBrand;

export default Nav;
