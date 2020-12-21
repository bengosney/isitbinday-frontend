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
        <Router>
          <Auth>
            <MainAppSection />
          </Auth>
        </Router>
      </Container>
    </ChakraProvider>
  );
}

export default App;
