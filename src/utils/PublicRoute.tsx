import { authContext } from '../Auth';
import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PublicRouteProps extends RouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children, ...rest }: PublicRouteProps) => {
  const { loggedIn = false } = useContext(authContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !loggedIn ? children : <Redirect to={{ pathname: '/iibd', state: { from: location } }} />
      }
    />
  );
};

export default PublicRoute;
