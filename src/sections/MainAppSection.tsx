import { authContext } from '../Auth';
import PrivateSection from '../sections/PrivateSection';
import PrivateRoute from '../utils/PrivateRoute';
import PublicRoute from '../utils/PublicRoute';
import apiFetch from '../utils/apiFetch';
import FullPage from '../widgets/FullPage';
import Home from '../widgets/Home';
import LoginForm from '../widgets/LoginForm';
import Logout from '../widgets/Logout';
import Nav from '../widgets/Nav';
import ContactSection from './ContactSection';
import PrivacyPolicySection from './PrivacyPolicySection';
import RegisterSection from './RegisterSection';
import TermsSection from './TermsSection';
import { Spacer } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';

// Topbar for public static pages (privacy, terms, contact) so they aren't
// rendered headerless with no way back into the app.
const StaticPage = ({ children }: { children: React.ReactNode }) => {
  const { loggedIn } = useContext(authContext);
  return (
    <>
      <Nav>
        <Link to={loggedIn ? '/iibd' : '/'}>
          <Nav.Brand />
        </Link>
        <Spacer />
        {loggedIn ? (
          <Nav.Item as={Link} to="/iibd">
            Dashboard
          </Nav.Item>
        ) : (
          <Nav.Item as={Link} to="/login">
            Sign in
          </Nav.Item>
        )}
      </Nav>
      <FullPage>{children}</FullPage>
    </>
  );
};

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
          <StaticPage>
            <PrivacyPolicySection />
          </StaticPage>
        }
      />
      <Route
        path="/terms-and-conditions"
        element={
          <StaticPage>
            <TermsSection />
          </StaticPage>
        }
      />
      <Route
        path="/contact"
        element={
          <StaticPage>
            <ContactSection />
          </StaticPage>
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
