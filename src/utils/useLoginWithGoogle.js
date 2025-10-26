import { authContext } from '../Auth';
import { useGoogleOneTapLogin, googleLogout } from '@react-oauth/google';
import React, { useContext, useState, useEffect } from 'react';

export const useLoginWithGoogle = () => {
  const { loginViaGoogleJWT } = useContext(authContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    googleLogout();
  }, []);

  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      setLoading(true);
      await loginViaGoogleJWT(credentialResponse.credential);
    },
    onError: () => {
      setError(true);
      setLoading(false);
    },
    use_fedcm_for_prompt: true,
    use_fedcm_for_button: true,
    //auto_select: true,
  });

  return { loading, error };
};
export default useLoginWithGoogle;
