import PublicRoute from '../utils/PublicRoute';
import RegisterActivate from '../widgets/RegisterActivate';
import RegisterDetails from '../widgets/RegisterDetails';
import RegisterForm from '../widgets/RegisterForm';
import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';

const RegisterSection = () => {
  const { path } = useRouteMatch();
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
