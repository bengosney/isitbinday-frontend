import { authContext } from '../Auth';
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
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
