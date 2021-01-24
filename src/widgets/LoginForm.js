import React, { useContext, useState } from 'react';
import { Form } from '../utils/Form';
import { authContext } from '../Auth';
import { Heading, Stack, Divider } from '@chakra-ui/react';
import * as Yup from 'yup';
import usePageTitle from '../utils/usePageTitle';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Required').ensure(),
  password: Yup.string().required('Required').ensure(),
});

const LoginForm = () => {
  usePageTitle('Login');
  const { login } = useContext(authContext);
  const [loading, setLoading] = useState(false);

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
              <Form.Button type="submit" disabled={!dirty}>
                Login
              </Form.Button>
            </Stack>
          );
        }}
      </Form>
    </Stack>
  );
};
export default LoginForm;
