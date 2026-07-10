import { authContext } from '../Auth';
import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
  const { loggedIn = false } = useContext(authContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? children : <Redirect to={{ pathname: '/login', state: { from: location } }} />
      }
    />
  );
};

export default PrivateRoute;
