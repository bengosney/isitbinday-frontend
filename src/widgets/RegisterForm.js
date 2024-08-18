import { Form } from '../utils/Form';
import apiFetch from '../utils/apiFetch';
import usePageTitle from '../utils/usePageTitle';
import { Heading, Stack, Divider } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().required('Required'),
  /*.matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    )*/ passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required').ensure(),
});

const RegisterForm = () => {
  usePageTitle('Register');
  const history = useHistory();
  const { url } = useRouteMatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <Stack maxW={'25rem'} margin={'auto'} height={'100vh'} justify={'center'} spacing={4}>
      <Heading as="h2" color="teal" textAlign="center">
        Register for an account
      </Heading>
      <Divider />

      <Form
        error={error}
        initialValues={registerSchema.cast({})}
        validationSchema={registerSchema}
        onSubmit={async (values, { resetForm }) => {
          const { email, password, firstName, lastName } = values;
          setLoading('Creating account...');
          setError('');

          const params = {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            url_template: `${window.location.origin}${url}/activate/{{ uid }}/{{ token }}`,
          };

          try {
            const result = await apiFetch('api/accounts/create/', params);

            if (result.email) {
              history.push(`${url}/${result.email}`);
            }
          } catch (e) {
            setError(`${e}`);
          }

          setLoading(false);
          resetForm();
        }}
        loading={loading}
      >
        {() => {
          return (
            <Stack>
              <Form.Input name={'email'} />
              <Form.Input name={'password'} type="password" />
              <Form.Input name={'passwordConfirmation'} type="password" />
              <Form.Input name={'firstName'} />
              <Form.Input name={'lastName'} />
              <Form.Button type="submit">Register</Form.Button>
            </Stack>
          );
        }}
      </Form>
    </Stack>
  );
};

export default RegisterForm;
