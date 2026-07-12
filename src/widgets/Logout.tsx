import { authContext } from '../Auth';
import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useContext(authContext);

  useEffect(() => logout());

  return <Navigate to="/" replace />;
};
export default Logout;
