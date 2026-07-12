import useTokens from '../utils/useTokens';
import { chakra, type HTMLChakraProps } from '@chakra-ui/react';
import React from 'react';

interface LogoMarkProps extends HTMLChakraProps<'svg'> {
  size?: string;
}

const LogoMark = ({ size = '22px', ...props }: LogoMarkProps) => {
  const tokens = useTokens();
  return (
    <chakra.svg width={size} height={size} viewBox="0 0 32 32" flex="none" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="10" fill={tokens.accent} />
      <circle cx="16" cy="16" r="5.75" fill={tokens.appBg} />
    </chakra.svg>
  );
};

export default LogoMark;
