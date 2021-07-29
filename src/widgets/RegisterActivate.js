import React, { useState } from 'react';
import { Switch, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import apiFetch from '../utils/apiFetch';
import { Stack, Heading, Spinner, Box, Center } from '@chakra-ui/react';

const RegisterActivate = () => {
  const params = useParams();
  const [error, setError] = useState(false);
  const history = useHistory();

  apiFetch('api/accounts/activate/', params).then((result) => {
    const { email = false } = result;
    if (!email) {
      setError(!email);
    } else {
      history.replace('/login/activated');
    }
  });

  if (error) {
    return (
      <Stack maxW={'25rem'} margin={'auto'} height={'100vh'} justify={'center'} spacing={4}>
        <Box>Invalid Code</Box>
      </Stack>
    );
  }

  return (
    <Stack maxW={'25rem'} margin={'auto'} height={'100vh'} justify={'center'} spacing={4}>
      <Box textAlign="center">Checking account</Box>
      <Center>
        <Spinner />
      </Center>
    </Stack>
  );
};

export default RegisterActivate;
