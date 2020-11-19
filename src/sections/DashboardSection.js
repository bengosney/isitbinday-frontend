import { Box, Heading } from '@chakra-ui/core';
import React from 'react';
import usePageTitle from '../utils/usePageTitle';
import RadialMenu from '../widgets/RadialMenu';

const DashboardSection = () => {
  usePageTitle('Dashboard');
  return (
    <div>
      <Heading>Dashboard</Heading>
      <RadialMenu
        backgroundColor={'#9999ff'}
        childProps={{
          backgroundColor: '#ffffff',
          borderRadius: '50%',
        }}
      >
        <Box>Foo</Box>
        <Box>Bar</Box>
        <Box>Baz</Box>
        <Box>foo</Box>
        <Box>bar</Box>
        <Box>baz</Box>
        <Box>pop</Box>
      </RadialMenu>
    </div>
  );
};

export default DashboardSection;
