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
      <Stack gap={2.5}>
        <Button asChild colorPalette="brand" width="100%">
          <Link to="/login">
            Sign in
            <IconLogin />
          </Link>
        </Button>
        <Button asChild variant="outline" width="100%">
          <Link to="/register">
            Create an account
            <IconRegister />
          </Link>
        </Button>
      </Stack>
    </AuthShell>
  );
};

export default Home;
