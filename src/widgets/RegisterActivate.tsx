import apiFetch from '../utils/apiFetch';
import { NarrowStack } from '../widgets/NarrowStack';
import { Spinner, Box, Center } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RegisterActivate = () => {
  const params = useParams();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  apiFetch('api/accounts/activate/', params).then((result) => {
    const { email = false } = result;
    if (!email) {
      setError(!email);
    } else {
      navigate('/login/activated', { replace: true });
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
