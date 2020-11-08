import { Heading } from '@chakra-ui/core';
import React from 'react';
import usePageTitle from '../utils/usePageTitle';

const DashboardSection = () => {
  usePageTitle('Dashboard');
  return <Heading>Dashboard</Heading>;
};

export default DashboardSection;
