import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { ChakraProvider, Container, useColorModeValue, useColorMode, Button } from '@chakra-ui/core';
import customTheme from './theme';

import Auth from './Auth';
import PublicRoute from './utils/PublicRoute';
import PrivateRoute from './utils/PrivateRoute';

import PrivateSection from './sections/PrivateSection';
import LoginForm from './widgets/LoginForm';
import Logout from './widgets/Logout';
import Home from './widgets/Home';

function App() {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <Container maxW="xl" borderColor={'gray.100'}>
        <Auth>
          <Router>
            <Switch>
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
          </Router>
        </Auth>
      </Container>
    </ChakraProvider>
  );
}

export default App;
