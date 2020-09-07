import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authContext } from '../Auth';

const PublicRoute = ({ children, ...rest }) => {
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
