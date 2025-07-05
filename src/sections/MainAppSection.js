import PrivateSection from '../sections/PrivateSection';
import PrivateRoute from '../utils/PrivateRoute';
import PublicRoute from '../utils/PublicRoute';
import apiFetch from '../utils/apiFetch';
import Home from '../widgets/Home';
import LoginForm from '../widgets/LoginForm';
import Logout from '../widgets/Logout';
import MaxWidth from '../widgets/MaxWidth';
import ContactSection from './ContactSection';
import PrivacyPolicySection from './PrivacyPolicySection';
import RegisterSection from './RegisterSection';
import TermsSection from './TermsSection';
import React, { useEffect } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';

const MainAppSection = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    (async () => {
      try {
        await apiFetch('api/tasks/tasks/auto_archive/');
      } catch {
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
        <MaxWidth>
          <LoginForm />
        </MaxWidth>
      </PublicRoute>
      <PublicRoute path="/register">
        <MaxWidth>
          <RegisterSection />
        </MaxWidth>
      </PublicRoute>
      <Route path="/privacy-policy">
        <MaxWidth>
          <PrivacyPolicySection />
        </MaxWidth>
      </Route>
      <Route path="/terms-and-conditions">
        <MaxWidth>
          <TermsSection />
        </MaxWidth>
      </Route>
      <Route path="/contact">
        <MaxWidth>
          <ContactSection />
        </MaxWidth>
      </Route>
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
