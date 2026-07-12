import { authContext } from '../Auth';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { loggedIn = false } = useContext(authContext);
  const location = useLocation();

  return !loggedIn ? <>{children}</> : <Navigate to="/iibd" replace state={{ from: location }} />;
};

export default PublicRoute;
