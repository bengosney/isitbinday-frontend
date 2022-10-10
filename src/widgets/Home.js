import usePageTitle from '../utils/usePageTitle';
import { Stack, Heading, Button } from '@chakra-ui/react';
import React from 'react';
import { BiLogInCircle as IconLogin, BiUserPlus as IconRegister } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Home = () => {
  usePageTitle();
  return (
    <Stack maxW={'25rem'} margin={'auto'} minHeight={'100vh'} justify={'center'} spacing={4}>
      <Heading>Is is bin day?</Heading>
      <Button as={Link} to="/login" rightIcon={<IconLogin />}>
        Login
      </Button>
      <Button as={Link} to="/register" rightIcon={<IconRegister />}>
        Register
      </Button>
    </Stack>
  );
};

export default Home;
