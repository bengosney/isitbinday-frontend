import { Heading } from '@chakra-ui/core';
import React from 'react';
import usePageTitle from '../utils/usePageTitle';

const SprintSection = () => {
  usePageTitle('Sprints');
  return <Heading>Sprints</Heading>;
};

export default SprintSection;
