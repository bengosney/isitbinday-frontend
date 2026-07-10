import App from './App';
import './index.css';
import './reset.css';
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
