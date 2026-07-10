import usePageTitle from '../utils/usePageTitle';
import AuthShell from '../widgets/AuthShell';
import { Button, Stack } from '@chakra-ui/react';
import React from 'react';
import { BiLogInCircle as IconLogin, BiUserPlus as IconRegister } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Home = () => {
  usePageTitle();
  return (
    <AuthShell title="Is it bin day?" subtitle="A practical task list for the house">
      <Stack spacing={2.5}>
        <Button as={Link} to="/login" colorScheme="brand" rightIcon={<IconLogin />}>
          Sign in
        </Button>
        <Button as={Link} to="/register" variant="outline" rightIcon={<IconRegister />}>
          Create an account
        </Button>
      </Stack>
    </AuthShell>
  );
};

export default Home;
