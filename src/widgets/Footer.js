import { getConfig } from '../config';
import { Box, Flex, Spacer, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const FooterHeight = '3rem';

export const Footer = () => (
  <Flex direction="row" gap={4} height={FooterHeight} alignItems="center">
    <Link as={RouterLink} to="/privacy-policy">
      Privacy Policy
    </Link>
    <Link as={RouterLink} to="/terms-and-conditions">
      Terms and Conditions
    </Link>
    <Link as={RouterLink} to="/contact">
      Contact
    </Link>
    <Spacer />
    <Text fontSize="xs" fontFamily="Monaco, Lucida Console, Courier New, Courier">
      Build: {getConfig('build')}
    </Text>
  </Flex>
);

export default Footer;
