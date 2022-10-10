import { authContext } from '../Auth';
import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Logout = () => {
  const { logout } = useContext(authContext);

  useEffect(() => logout());

  return <Redirect to="/" />;
};
export default Logout;
