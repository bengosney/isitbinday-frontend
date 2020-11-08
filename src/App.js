import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import { ChakraProvider, Container } from '@chakra-ui/core';
import customTheme from './theme';

import Auth from './Auth';
import MainAppSection from './sections/MainAppSection';

function App() {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <Container maxW="xl" borderColor={'gray.100'}>
        <Auth>
          <Router>
            <MainAppSection />
          </Router>
        </Auth>
      </Container>
    </ChakraProvider>
  );
}

export default App;
