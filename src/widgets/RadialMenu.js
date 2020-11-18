import React from 'react';
import { Box } from '@chakra-ui/core';

const RadialMenu = ({ items, size = 500, sizeUnit = 'px' }) => {
  const step = (2 * Math.PI) / items.length;
  const radius = size * .25;

  return (
    <Box
      width={`${size}${sizeUnit}`}
      height={`${size}${sizeUnit}`}
      borderRadius={`${size / 2}${sizeUnit}`}
      backgroundColor={'#9999ff'}
      position={'relative'}
    >
      {items.map((item, i) => {
        const top = radius * Math.cos(step * i) + size / 2;
        const left = radius * Math.sin(step * i) + size / 2;
        return (
          <Box key={i} top={top} left={left} position={'absolute'}>
            {item}
          </Box>
        );
      })}
    </Box>
  );
};

export default RadialMenu;
