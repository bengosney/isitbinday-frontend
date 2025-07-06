import Auth from './Auth';
import { getConfig } from './config';
import { db } from './db';
import MainAppSection from './sections/MainAppSection';
import customTheme from './theme';
import Footer from './widgets/Footer';
import { ChakraProvider, Box, Text, Spinner, Flex, Spacer, Link, Stack } from '@chakra-ui/react';
import { Portal } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'use-pouchdb';

function App() {
  const [fetching, setFetching] = useState(true);
  window.addEventListener('fetching', (event) => {
    setFetching(event.detail);
  });

  const loader = fetching ? (
    <Portal>
      <Box position={'fixed'} pointerEvents={'none'} bottom={'1rem'} left={'1rem'}>
        <Spinner />
      </Box>
    </Portal>
  ) : null;

  return (
    <Provider pouchdb={db}>
      <ChakraProvider resetCSS theme={customTheme}>
        <Auth>
          <Router>
            {loader}
            <Stack minHeight={'100vh'} gap={0}>
              <Box flexGrow={1}>
                <MainAppSection />
              </Box>
              <Box paddingX={16}>
                <Footer />
              </Box>
            </Stack>
          </Router>
        </Auth>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
