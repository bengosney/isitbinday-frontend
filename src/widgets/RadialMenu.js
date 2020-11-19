import React from 'react';
import { Box } from '@chakra-ui/core';

const RadialMenu = ({ children = [], size = 500, sizeUnit = 'px', childProps = {}, ...props }) => {
  const step = (2 * Math.PI) / children.length;
  const radius = size * 0.35;
  const stepWidth = ((Math.PI * radius * 2) / children.length);

  return (
    <Box
      width={`${size}${sizeUnit}`}
      height={`${size}${sizeUnit}`}
      borderRadius={`${size / 2}${sizeUnit}`}
      position={'relative'}
      {...props}
    >
      {React.Children.map(children, (child, i) => {
        const top = radius * Math.cos(step * i) + size / 2;
        const left = radius * Math.sin(step * i) + size / 2;
        return (
          <Box
            key={i}
            top={`${top - stepWidth / 2}${sizeUnit}`}
            left={`${left - stepWidth / 2}${sizeUnit}`}
            width={`${stepWidth}${sizeUnit}`}
            height={`${stepWidth}${sizeUnit}`}
            position={'absolute'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            {...childProps}
          >
            {React.cloneElement(child)}
          </Box>
        );
      })}
    </Box>
  );
};

export default RadialMenu;
