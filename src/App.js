import Auth from './Auth';
import { getConfig } from './config';
import { db } from './db';
import MainAppSection from './sections/MainAppSection';
import customTheme from './theme';
import { ChakraProvider, Box, Text, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'use-pouchdb';

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
        <Box borderColor={'gray.100'}>
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
