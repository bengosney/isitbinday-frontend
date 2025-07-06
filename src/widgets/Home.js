import usePageTitle from '../utils/usePageTitle';
import { NarrowStack } from '../widgets/NarrowStack';
import { Stack, Heading, Button } from '@chakra-ui/react';
import React from 'react';
import { BiLogInCircle as IconLogin, BiUserPlus as IconRegister } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Home = () => {
  usePageTitle();
  return (
    <NarrowStack>
      <Heading>Is it bin day?</Heading>
      <Button as={Link} to="/login" rightIcon={<IconLogin />}>
        Login
      </Button>
      <Button as={Link} to="/register" rightIcon={<IconRegister />}>
        Register
      </Button>
    </NarrowStack>
  );
};

export default Home;
