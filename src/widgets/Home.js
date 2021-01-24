import React from 'react';
import { Stack, Heading, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FcLock } from 'react-icons/fc';
import usePageTitle from '../utils/usePageTitle';

const Home = () => {
  usePageTitle();
  return (
    <Stack maxW={'25rem'} margin={'auto'} minHeight={'100vh'} justify={'center'} spacing={4}>
      <Heading>Is is bin day?</Heading>
      <Button as={Link} to="/login" rightIcon={<FcLock />}>
        Login
      </Button>
    </Stack>
  );
};

export default Home;
