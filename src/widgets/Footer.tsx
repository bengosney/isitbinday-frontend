import { getConfig } from '../config';
import { Flex, Spacer, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const FooterHeight = '3rem';

export const Footer = () => (
  <Flex direction="row" gap={4} height={FooterHeight} alignItems="center">
    <Link asChild>
      <RouterLink to="/privacy-policy">Privacy Policy</RouterLink>
    </Link>
    <Link asChild>
      <RouterLink to="/terms-and-conditions">Terms and Conditions</RouterLink>
    </Link>
    <Link asChild>
      <RouterLink to="/contact">Contact</RouterLink>
    </Link>
    <Spacer />
    <Text fontSize="xs" fontFamily="Monaco, Lucida Console, Courier New, Courier">
      Build: {getConfig('build')}
    </Text>
  </Flex>
);

export default Footer;
