import usePageTitle from '../utils/usePageTitle';
import { Heading } from '@chakra-ui/react';
import React from 'react';

const DashboardSection = () => {
  usePageTitle('Dashboard');
  return <Heading>Dashboard</Heading>;
};

export default DashboardSection;
