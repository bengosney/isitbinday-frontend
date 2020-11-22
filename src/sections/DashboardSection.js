import { Heading, Stack } from '@chakra-ui/core';
import React from 'react';
import usePageTitle from '../utils/usePageTitle';
import Test from './Test';

const DashboardSection = () => {
  usePageTitle('Dashboard');
  return (
    <Stack>
      <Heading>Dashboard</Heading>
      <Test />
    </Stack>
  );
};

export default DashboardSection;
