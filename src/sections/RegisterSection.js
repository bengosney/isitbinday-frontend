import PublicRoute from '../utils/PublicRoute';
import FAB from '../widgets/FAB';
import RegisterActivate from '../widgets/RegisterActivate';
import RegisterDetails from '../widgets/RegisterDetails';
import RegisterForm from '../widgets/RegisterForm';
import React from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Switch, useRouteMatch, useHistory } from 'react-router-dom';

const RegisterSection = () => {
  const { path } = useRouteMatch();
  const history = useHistory();
  return (
    <>
      <FAB onClick={() => history.push('/')}>
        <MdKeyboardBackspace />
      </FAB>
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
    </>
  );
};

export default RegisterSection;
