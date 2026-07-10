import Auth from './Auth';
import { db } from './db';
import MainAppSection from './sections/MainAppSection';
import { system } from './theme';
import { toaster } from './utils/toaster';
import Footer from './widgets/Footer';
import { ChakraProvider, Box, Spinner, Stack, Toaster, ToastRoot, ToastTitle, ToastCloseTrigger } from '@chakra-ui/react';
import { Portal } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'use-pouchdb';

function App() {
  const [fetching, setFetching] = useState(true);
  window.addEventListener('fetching', (event) => {
    setFetching((event as CustomEvent<boolean>).detail);
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
      <ChakraProvider value={system}>
        <Toaster toaster={toaster}>
          {(toast) => (
            <ToastRoot key={toast.id}>
              <ToastTitle>{toast.title as string}</ToastTitle>
              <ToastCloseTrigger />
            </ToastRoot>
          )}
        </Toaster>
        <GoogleOAuthProvider clientId="582381464087-14q0s67afpctetcj59cfns61g8qak33s.apps.googleusercontent.com">
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
        </GoogleOAuthProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
