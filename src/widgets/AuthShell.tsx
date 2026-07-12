import useTokens from '../utils/useTokens';
import LogoMark from './LogoMark';
import { Heading, Stack, Text, type StackProps } from '@chakra-ui/react';
import React from 'react';

export const AuthCard = ({ children, ...props }: StackProps) => {
  const tokens = useTokens();
  return (
    <Stack
      background={tokens.surface}
      border="1px solid"
      borderColor={tokens.border}
      borderRadius="14px"
      padding={6}
      gap={4}
      {...props}
    >
      {children}
    </Stack>
  );
};

interface AuthShellProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}

export const AuthShell = ({ title, subtitle = null, children }: AuthShellProps) => {
  const tokens = useTokens();
  return (
    <Stack maxW={{ base: '100%', md: '25rem' }} width="100%" margin="auto" gap={6} paddingY={10}>
      <Stack align="center" gap={3.5}>
        <LogoMark size="40px" />
        <Stack align="center" gap={1}>
          <Heading fontSize="20px" fontWeight={600} letterSpacing="-.01em" textAlign="center">
            {title}
          </Heading>
          {subtitle && (
            <Text as="div" fontSize="13.5px" color={tokens.textMuted} textAlign="center">
              {subtitle}
            </Text>
          )}
        </Stack>
      </Stack>
      {children}
    </Stack>
  );
};

export default AuthShell;
