import apiFetch from '../utils/apiFetch';
import { NarrowStack } from '../widgets/NarrowStack';
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
      <NarrowStack>
        <Box>Invalid Code</Box>
      </NarrowStack>
    );
  }

  return (
    <NarrowStack>
      <Box textAlign="center">Checking account</Box>
      <Center>
        <Spinner />
      </Center>
    </NarrowStack>
  );
};

export default RegisterActivate;
