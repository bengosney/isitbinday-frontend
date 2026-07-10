import { authContext } from '../Auth';
import { Form } from '../utils/Form';
import { useLoginWithGoogle } from '../utils/useLoginWithGoogle';
import usePageTitle from '../utils/usePageTitle';
import useTokens from '../utils/useTokens';
import AuthShell, { AuthCard } from '../widgets/AuthShell';
import { Stack, Alert, AlertIcon, Link as ChakraLink, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Required').ensure(),
  password: Yup.string().required('Required').ensure(),
});

const LoginForm = () => {
  usePageTitle('Login');
  const { login } = useContext(authContext);
  const [authLoading, setLoading] = useState(false);
  const { action = null } = useParams();
  const tokens = useTokens();

  const { loading: googleLoading } = useLoginWithGoogle();

  const loading = authLoading || googleLoading;

  let msg = null;
  switch (action) {
    case 'activated':
      msg = (
        <Alert status="success" borderRadius="10px">
          <AlertIcon />
          Account activated
        </Alert>
      );
  }

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to Is it bin day?">
      {msg}
      <AuthCard>
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
          {() => {
            return (
              <Stack spacing={4}>
                <Form.Input name={'username'} label="Email" />
                <Form.Input name={'password'} type="password" label="Password" />
                <Form.Button colorScheme="brand" type="submit">
                  Sign in
                </Form.Button>
              </Stack>
            );
          }}
        </Form>
      </AuthCard>
      <Text textAlign="center" fontSize="13px" color={tokens.textMuted}>
        No account?{' '}
        <ChakraLink as={Link} to="/register" color={tokens.accentText} fontWeight={500}>
          Create one
        </ChakraLink>
      </Text>
    </AuthShell>
  );
};
export default LoginForm;
