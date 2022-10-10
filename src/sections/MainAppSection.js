import PrivateSection from '../sections/PrivateSection';
import PrivateRoute from '../utils/PrivateRoute';
import PublicRoute from '../utils/PublicRoute';
import apiFetch from '../utils/apiFetch';
import Home from '../widgets/Home';
import LoginForm from '../widgets/LoginForm';
import Logout from '../widgets/Logout';
import RegisterSection from './RegisterSection';
import React, { useEffect } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';

const MainAppSection = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    (async () => {
      try {
        await apiFetch('api/tasks/tasks/auto_archive/');
      } catch (error) {
        // do nothing
      }
    })();
  }, []);

  return (
    <Switch>
      <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
      <Route exact path="/">
        <Home />
      </Route>
      <PublicRoute path={['/login/:action', '/login']}>
        <LoginForm />
      </PublicRoute>
      <PublicRoute path="/register">
        <RegisterSection />
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
