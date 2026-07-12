import useTokens from '../utils/useTokens';
import LogoMark from './LogoMark';
import { Box, Flex, Text, type BoxProps, type FlexProps } from '@chakra-ui/react';
import React from 'react';

interface NavItemProps extends BoxProps {
  active?: boolean;
  to?: string;
}

export const NavItem = ({ children, active = false, ...props }: NavItemProps) => {
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

type NavComponent = React.FC<FlexProps> & {
  Item: typeof NavItem;
  Brand: typeof NavBrand;
};

const Nav: NavComponent = ({ children, ...props }: FlexProps) => {
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
