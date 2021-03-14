import React from 'react';
import RegisterForm from '../widgets/RegisterForm';
import RegisterActivate from '../widgets/RegisterActivate';
import { Switch, useRouteMatch, useParams } from 'react-router-dom';

import PublicRoute from '../utils/PublicRoute';
import PrivateRoute from '../utils/PrivateRoute';

import RegisterDetails from '../widgets/RegisterDetails';

const RegisterSection = () => {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <PublicRoute exact path={`${path}/`}>
        <RegisterForm />
      </PublicRoute>
      <PublicRoute path={`${path}/activate/:uid/:token`}>
        <RegisterActivate />
      </PublicRoute>
      <PublicRoute path={`${path}/:email`}>
        <RegisterDetails />
      </PublicRoute>
    </Switch>
  );
};

export default RegisterSection;
