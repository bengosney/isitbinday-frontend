import usePageTitle from '../utils/usePageTitle';
import { Heading } from '@chakra-ui/react';
import React from 'react';

const SprintSection = () => {
  usePageTitle('Sprints');
  return <Heading>Sprints</Heading>;
};

export default SprintSection;
