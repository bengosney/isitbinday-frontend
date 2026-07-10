import { authContext } from '../Auth';
import { useGoogleOneTapLogin, googleLogout } from '@react-oauth/google';
import { useContext, useState, useEffect } from 'react';

interface AuthContextValue {
  loggedIn: boolean;
  login?: (username: string, password: string) => Promise<void>;
  logout?: () => void;
  loginViaGoogleJWT?: (jwt?: string) => Promise<void>;
}

export const useLoginWithGoogle = () => {
  const { loginViaGoogleJWT } = useContext(authContext) as AuthContextValue;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    googleLogout();
  }, []);

  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      setLoading(true);
      await loginViaGoogleJWT?.(credentialResponse.credential);
    },
    onError: () => {
      setError(true);
      setLoading(false);
    },
    use_fedcm_for_prompt: true,
    use_fedcm_for_button: true,
    auto_select: true,
  });

  return { loading, error };
};
export default useLoginWithGoogle;
