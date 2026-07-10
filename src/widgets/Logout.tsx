import { authContext } from '../Auth';
import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Logout = () => {
  // authContext will be fully typed after Auth.jsx is converted (Group 3)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { logout } = useContext(authContext) as any;

  useEffect(() => logout());

  return <Redirect to="/" />;
};
export default Logout;
