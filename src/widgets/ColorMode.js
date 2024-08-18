import { Box, Flex, FormControl, FormLabel, Switch, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';

const ColorMode = ({ children, ...props }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const icon = colorMode === 'light' ? <BiSun /> : <BiMoon />;

  return (
    <Flex justifyContent={'space-between'} {...props}>
      {children && <Box onClick={toggleColorMode}>{children}</Box>}
      <FormControl display="flex" alignItems="center" width={'auto'}>
        <FormLabel htmlFor="color-mode" mb="0">
          {icon}
        </FormLabel>
        <Switch size="sm" id="color-mode" isChecked={colorMode == 'dark'} onChange={toggleColorMode} />
      </FormControl>
    </Flex>
  );
};

export default ColorMode;
