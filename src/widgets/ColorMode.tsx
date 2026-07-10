import useTokens from '../utils/useTokens';
import { IconButton, useMediaQuery, type IconButtonProps } from '@chakra-ui/react';
import React from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';

const ColorMode = ({ ...props }: Omit<IconButtonProps, 'aria-label'>) => {
  const [isDark] = useMediaQuery(['(prefers-color-scheme: dark)']);
  const tokens = useTokens();

  const icon = isDark ? <BiSun /> : <BiMoon />;

  return (
    <IconButton
      aria-label={`System colour mode: ${isDark ? 'dark' : 'light'}`}
      variant="plain"
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
