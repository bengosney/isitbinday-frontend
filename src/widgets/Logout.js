import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { authContext } from '../Auth';

const Logout = () => {

  const { logout } = useContext(authContext);

  useEffect(() => logout());

  return (
    <Redirect to="/" />
  );
};
export default Logout;