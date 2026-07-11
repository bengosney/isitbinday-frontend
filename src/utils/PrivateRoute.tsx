import { authContext } from '../Auth';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { loggedIn = false } = useContext(authContext);
  const location = useLocation();

  return loggedIn ? <>{children}</> : <Navigate to="/login" replace state={{ from: location }} />;
};

export default PrivateRoute;
