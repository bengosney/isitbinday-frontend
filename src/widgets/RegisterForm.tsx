import { Form } from '../utils/Form';
import apiFetch from '../utils/apiFetch';
import usePageTitle from '../utils/usePageTitle';
import useTokens from '../utils/useTokens';
import AuthShell, { AuthCard } from '../widgets/AuthShell';
import { Box, Button, Flex, Grid, Link as ChakraLink, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
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

const STEP_ONE_FIELDS = ['email', 'password', 'passwordConfirmation'];

const RegisterForm = () => {
  usePageTitle('Register');
  const history = useHistory();
  const { url } = useRouteMatch();
  const tokens = useTokens();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState<boolean | string>(false);
  const [error, setError] = useState('');

  const continueToProfile = (formik: Record<string, unknown>) => {
    const { validateForm, setTouched } = formik as {
      validateForm: () => Promise<Record<string, unknown>>;
      setTouched: (t: Record<string, boolean>) => void;
    };
    validateForm().then((errors) => {
      const stepErrors = STEP_ONE_FIELDS.filter((field) => errors[field]);
      if (stepErrors.length === 0) {
        setStep(2);
      } else {
        setTouched(stepErrors.reduce((touched: Record<string, boolean>, field) => ({ ...touched, [field]: true }), {}));
      }
    });
  };

  return (
    <AuthShell
      title={step === 1 ? 'Create your account' : 'Nearly there'}
      subtitle={
        <Text fontFamily="mono" fontSize="11px">
          Step {step} of 2 · {step === 1 ? 'Account' : 'Profile'}
        </Text>
      }
    >
      <Flex gap={1.5}>
        <Box flex={1} height="3px" borderRadius="full" background={tokens.accent} />
        <Box flex={1} height="3px" borderRadius="full" background={step === 2 ? tokens.accent : tokens.borderStrong} />
      </Flex>
      <AuthCard>
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
              setStep(1);
            }

            setLoading(false);
            resetForm();
          }}
          loading={loading}
        >
          {(props, formik) => {
            return (
              <Stack gap={4}>
                {step === 1 ? (
                  <>
                    <Form.Input name={'email'} />
                    <Form.Input name={'password'} type="password" />
                    <Form.Input name={'passwordConfirmation'} type="password" label="Confirm password" />
                    <Button colorPalette="brand" type="button" onClick={() => continueToProfile(formik)}>
                      Continue
                    </Button>
                  </>
                ) : (
                  <>
                    <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr' }} gap={3}>
                      <Form.Input name={'firstName'} label="First name" />
                      <Form.Input name={'lastName'} label="Last name" />
                    </Grid>
                    <Form.Button colorPalette="brand" type="submit">
                      Create account
                    </Form.Button>
                  </>
                )}
              </Stack>
            );
          }}
        </Form>
      </AuthCard>
      {step === 1 ? (
        <Text textAlign="center" fontSize="13px" color={tokens.textMuted}>
          Already have an account?{' '}
          <Link to="/login">
            <ChakraLink as="span" color={tokens.accentText} fontWeight={500}>
              Sign in
            </ChakraLink>
          </Link>
        </Text>
      ) : (
        <button
          type="button"
          onClick={() => setStep(1)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}
        >
          <ChakraLink as="span" textAlign="center" fontSize="13px" fontWeight={500} color={tokens.accentText}>
            ← Back to account details
          </ChakraLink>
        </button>
      )}
    </AuthShell>
  );
};

export default RegisterForm;
