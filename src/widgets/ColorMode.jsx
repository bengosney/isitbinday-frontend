import useTokens from '../utils/useTokens';
import { IconButton, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';

const ColorMode = ({ ...props }) => {
  const [isDark] = useMediaQuery('(prefers-color-scheme: dark)');
  const tokens = useTokens();

  const icon = isDark ? <BiSun /> : <BiMoon />;

  return (
    <IconButton
      aria-label={`System colour mode: ${isDark ? 'dark' : 'light'}`}
      variant="unstyled"
      size="sm"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      width="28px"
      height="28px"
      minWidth="28px"
      borderRadius="full"
      border="1px solid"
      borderColor={tokens.borderStrong}
      color={tokens.textMuted}
      _hover={{ color: tokens.text }}
      {...props}
    >
      {icon}
    </IconButton>
  );
};

export default ColorMode;
