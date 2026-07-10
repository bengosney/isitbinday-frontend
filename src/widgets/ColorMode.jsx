import useTokens from '../utils/useTokens';
import { IconButton, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';

const ColorMode = ({ ...props }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const tokens = useTokens();

  const icon = colorMode === 'light' ? <BiSun /> : <BiMoon />;

  return (
    <IconButton
      onClick={toggleColorMode}
      icon={icon}
      aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
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
    />
  );
};

export default ColorMode;
