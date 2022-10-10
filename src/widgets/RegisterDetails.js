import { Center, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';

const RegisterDetails = () => {
  const params = useParams();
  const { email } = params;

  return (
    <Stack maxW={'25rem'} margin={'auto'} height={'100vh'} justify={'center'} spacing={4}>
      <Heading as="h2" color="teal" textAlign="center">
        Account created
      </Heading>
      <Text align="center">{email}</Text>
      <Text align="center">An email has been send with a confirmation link.</Text>
    </Stack>
  );
};

export default RegisterDetails;
