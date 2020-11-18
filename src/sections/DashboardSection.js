import { Heading } from '@chakra-ui/core';
import React from 'react';
import usePageTitle from '../utils/usePageTitle';
import RadialMenu from '../widgets/RadialMenu';

const DashboardSection = () => {
  usePageTitle('Dashboard');
  return (
    <div>
      <Heading>Dashboard</Heading>
      <RadialMenu items={['foo', 'bar', 'baz', 'foo', 'bar', 'baz']} />
    </div>
  );
};

export default DashboardSection;
