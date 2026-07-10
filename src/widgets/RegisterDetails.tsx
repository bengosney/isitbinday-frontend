import useTokens from '../utils/useTokens';
import AuthShell, { AuthCard } from '../widgets/AuthShell';
import { Text } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';

const RegisterDetails = () => {
  const params = useParams<{ email?: string }>();
  const { email } = params;
  const tokens = useTokens();

  // AuthShell subtitle will be properly typed after Group 3 conversion
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AuthShellAny = AuthShell as any;
  return (
    <AuthShellAny title="Account created" subtitle="One more step">
      <AuthCard align="center">
        <Text fontWeight={600}>{email}</Text>
        <Text textAlign="center" fontSize="13.5px" color={tokens.textMuted}>
          An email has been sent with a confirmation link.
        </Text>
      </AuthCard>
    </AuthShellAny>
  );
};

export default RegisterDetails;
