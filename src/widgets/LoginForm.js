import React, { useContext } from 'react';
import { Form } from '../utils/Form';
import { authContext } from '../Auth';
import { Heading, Stack, Divider } from '@chakra-ui/core';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Required').ensure(),
  password: Yup.string().required('Required').ensure(),
});

const LoginForm = () => {
  const { login } = useContext(authContext);

  return (
    <Stack maxW={'25rem'} margin={'auto'} height={'100vh'} justify={'center'} spacing={4}>
      <Heading as="h2" color="teal" textAlign="center">
        Log-in to your account
      </Heading>
      <Divider />
      <Form
        initialValues={loginSchema.cast({})}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          const { username, password } = values;
          login(username, password);
        }}
      >
        <Stack>
          <Form.Input name={'username'} />
          <Form.Input name={'password'} type="password" />
          <Form.Button type="submit">Login</Form.Button>
        </Stack>
      </Form>
    </Stack>
  );
};
export default LoginForm;
