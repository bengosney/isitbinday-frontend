import React from 'react';

import { Switch, Route, useLocation, Redirect } from 'react-router-dom';

import PublicRoute from '../utils/PublicRoute';
import PrivateRoute from '../utils/PrivateRoute';

import PrivateSection from '../sections/PrivateSection';
import LoginForm from '../widgets/LoginForm';
import Logout from '../widgets/Logout';
import Home from '../widgets/Home';

const MainAppSection = () => {
  const { pathname } = useLocation();

  return (
    <Switch>
      <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
      <Route exact path="/">
        <Home />
      </Route>
      <PublicRoute path="/login">
        <LoginForm />
      </PublicRoute>
      <PrivateRoute path="/iibd">
        <PrivateSection />
      </PrivateRoute>
      <PrivateRoute path="/logout">
        <Logout />
      </PrivateRoute>
    </Switch>
  );
};

export default MainAppSection;
