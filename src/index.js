import App from './App';
import { getConfig } from './config';
import './index.css';
import './reset.css';
import * as serviceWorker from './serviceWorker';
import customTheme from './theme';
import { ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <>
    <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
    <App />
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (getConfig('service_worker')) {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}
