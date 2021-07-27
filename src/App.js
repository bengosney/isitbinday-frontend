import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import { ChakraProvider, Box, Text } from '@chakra-ui/react';
import customTheme from './theme';

import Auth from './Auth';
import MainAppSection from './sections/MainAppSection';
import { getConfig } from './config';

import { Provider } from 'use-pouchdb';
import { db } from './db';

function App() {
  return (
    <Provider pouchdb={db}>
      <ChakraProvider resetCSS theme={customTheme}>
        <Box maxW="90vw" margin="auto" borderColor={'gray.100'}>
          <Auth>
            <Router>
              <MainAppSection />
            </Router>
          </Auth>
        </Box>
        <Box maxW="90vw" margin="auto" w="100%" paddingTop={4} paddingBottom={4}>
          <Text fontSize="xs" fontFamily="Monaco, Lucida Console, Courier New, Courier">
            Build: {getConfig('build')}
          </Text>
        </Box>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
