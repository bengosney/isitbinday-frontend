import useTokens from '../utils/useTokens';
import { Flex, Box, type FlexProps } from '@chakra-ui/react';
import React from 'react';

interface LogoMarkProps extends FlexProps {
  size?: string;
  radius?: string;
}

const LogoMark = ({ size = '22px', radius = '7px', ...props }: LogoMarkProps) => {
  const tokens = useTokens();
  return (
    <Flex
      width={size}
      height={size}
      borderRadius={radius}
      background={tokens.accent}
      align="center"
      justify="center"
      flex="none"
      {...props}
    >
      <Box width="36%" height="36%" borderRadius="full" background={tokens.appBg} />
    </Flex>
  );
};

export default LogoMark;
