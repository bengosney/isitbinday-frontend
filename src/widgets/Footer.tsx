import { getConfig } from '../config';
import useTokens from '../utils/useTokens';
import MaxWidth from './MaxWidth';
import { Box, Flex, Link, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const Footer = () => {
  const tokens = useTokens();

  return (
    <Box borderTop="1px solid" borderColor={tokens.border} marginTop={10}>
      <MaxWidth>
        <Flex wrap="wrap" columnGap={5} rowGap={1} paddingY={4} alignItems="center">
          {[
            { to: '/privacy-policy', label: 'Privacy Policy' },
            { to: '/terms-and-conditions', label: 'Terms and Conditions' },
            { to: '/contact', label: 'Contact' },
          ].map(({ to, label }) => (
            <Link key={to} asChild fontSize="12px" color={tokens.textMuted} _hover={{ color: tokens.text }}>
              <RouterLink to={to}>{label}</RouterLink>
            </Link>
          ))}
          <Spacer />
          <Text fontFamily="mono" fontSize="11px" color={tokens.textDim}>
            Build: {getConfig('build')}
          </Text>
        </Flex>
      </MaxWidth>
    </Box>
  );
};

export default Footer;
