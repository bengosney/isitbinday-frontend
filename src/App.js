import React, { useState } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import { ChakraProvider, Box, Text, Spinner } from '@chakra-ui/react';

import customTheme from './theme';

import Auth from './Auth';
import MainAppSection from './sections/MainAppSection';
import { getConfig } from './config';

import { Provider } from 'use-pouchdb';
import { db } from './db';

function App() {
  const [fetching, setFetching] = useState(true);
  window.addEventListener('fetching', (event) => {
    setFetching(event.detail);
  });

  const loader = fetching ? (
    <Box position={'fixed'} pointerEvents={'none'} bottom={'1rem'} left={'1rem'}>
      <Spinner />
    </Box>
  ) : null;

  return (
    <Provider pouchdb={db}>
      <ChakraProvider resetCSS theme={customTheme}>
        <Box maxW="90vw" margin="auto" borderColor={'gray.100'}>
          {loader}
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
