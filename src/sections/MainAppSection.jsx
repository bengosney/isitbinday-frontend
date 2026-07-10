import PrivateSection from '../sections/PrivateSection';
import PrivateRoute from '../utils/PrivateRoute';
import PublicRoute from '../utils/PublicRoute';
import apiFetch from '../utils/apiFetch';
import FullPage from '../widgets/FullPage';
import Home from '../widgets/Home';
import LoginForm from '../widgets/LoginForm';
import Logout from '../widgets/Logout';
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
        <FullPage>
          <Home />
        </FullPage>
      </Route>
      <PublicRoute path={['/login/:action', '/login']}>
        <FullPage>
          <LoginForm />
        </FullPage>
      </PublicRoute>
      <PublicRoute path="/register">
        <FullPage>
          <RegisterSection />
        </FullPage>
      </PublicRoute>
      <Route path="/privacy-policy">
        <FullPage>
          <PrivacyPolicySection />
        </FullPage>
      </Route>
      <Route path="/terms-and-conditions">
        <FullPage>
          <TermsSection />
        </FullPage>
      </Route>
      <Route path="/contact">
        <FullPage>
          <ContactSection />
        </FullPage>
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
