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
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

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

  if (pathname !== '/' && pathname.endsWith('/')) {
    return <Navigate to={pathname.replace(/\/+$/, '')} replace />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <FullPage>
            <Home />
          </FullPage>
        }
      />
      <Route
        path="/login/:action?"
        element={
          <PublicRoute>
            <FullPage>
              <LoginForm />
            </FullPage>
          </PublicRoute>
        }
      />
      <Route
        path="/register/*"
        element={
          <PublicRoute>
            <FullPage>
              <RegisterSection />
            </FullPage>
          </PublicRoute>
        }
      />
      <Route
        path="/privacy-policy"
        element={
          <FullPage>
            <PrivacyPolicySection />
          </FullPage>
        }
      />
      <Route
        path="/terms-and-conditions"
        element={
          <FullPage>
            <TermsSection />
          </FullPage>
        }
      />
      <Route
        path="/contact"
        element={
          <FullPage>
            <ContactSection />
          </FullPage>
        }
      />
      <Route
        path="/iibd/*"
        element={
          <PrivateRoute>
            <PrivateSection />
          </PrivateRoute>
        }
      />
      <Route
        path="/logout"
        element={
          <PrivateRoute>
            <Logout />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default MainAppSection;
