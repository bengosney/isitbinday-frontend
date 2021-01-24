import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import { ChakraProvider, Box } from '@chakra-ui/react';
import customTheme from './theme';

import Auth from './Auth';
import MainAppSection from './sections/MainAppSection';

function App() {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <Box maxW="90vw" margin="auto" borderColor={'gray.100'}>
        <Auth>
          <Router>
            <MainAppSection />
          </Router>
        </Auth>
      </Box>
    </ChakraProvider>
  );
}

export default App;
