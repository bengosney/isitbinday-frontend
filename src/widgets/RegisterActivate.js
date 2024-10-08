import apiFetch from '../utils/apiFetch';
import { Stack, Spinner, Box, Center } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

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
