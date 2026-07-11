import { useColorMode } from '../utils/colorMode';
import useTokens from '../utils/useTokens';
import { IconButton, type IconButtonProps } from '@chakra-ui/react';
import React from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';

const ColorMode = ({ ...props }: Omit<IconButtonProps, 'aria-label'>) => {
  const { resolved, toggle } = useColorMode();
  const tokens = useTokens();

  const isDark = resolved === 'dark';
  const icon = isDark ? <BiSun /> : <BiMoon />;

  return (
    <IconButton
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      onClick={toggle}
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
