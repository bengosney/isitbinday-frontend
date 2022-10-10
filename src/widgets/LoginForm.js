import { authContext } from '../Auth';
import { Form } from '../utils/Form';
import usePageTitle from '../utils/usePageTitle';
import { Heading, Stack, Divider, Alert, AlertIcon } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useRouteMatch, useParams } from 'react-router-dom';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Required').ensure(),
  password: Yup.string().required('Required').ensure(),
});

const LoginForm = () => {
  usePageTitle('Login');
  const { login } = useContext(authContext);
  const [loading, setLoading] = useState(false);
  const { action = null } = useParams();

  let msg = null;
  switch (action) {
    case 'activated':
      msg = (
        <Alert status="success">
          <AlertIcon />
          Account activated
        </Alert>
      );
  }

  return (
    <Stack maxW={'25rem'} margin={'auto'} height={'100vh'} justify={'center'} spacing={4}>
      <Heading as="h2" color="teal" textAlign="center">
        Log-in to your account
      </Heading>
      {msg}
      <Divider />
      <Form
        initialValues={loginSchema.cast({})}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          const { username, password } = values;
          setLoading('Logging in...');
          login(username, password);
        }}
        loading={loading}
      >
        {({ dirty }) => {
          return (
            <Stack>
              <Form.Input name={'username'} />
              <Form.Input name={'password'} type="password" />
              <Form.Button type="submit">Login</Form.Button>
            </Stack>
          );
        }}
      </Form>
    </Stack>
  );
};
export default LoginForm;
