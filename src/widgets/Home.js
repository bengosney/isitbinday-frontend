import React from 'react';
import { Stack, Heading, Button } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { FcLock } from 'react-icons/fc';

const Home = () => {
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