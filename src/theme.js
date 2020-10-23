import { extendTheme, theme, useColorModeValue } from '@chakra-ui/core';

const customTheme = extendTheme({
  colors: {
    brand: {
      50: '#dbfffc',
      100: '#affff3',
      200: '#80ffec',
      300: '#51ffe4',
      400: '#2efedc',
      500: '#1fe5c2',
      600: '#0fb397',
      700: '#00806c',
      800: '#004d41',
      900: '#001c16',
    },
    default: {
      text: '#2a2a2a',
    },
    form: {
      error: '#E53E3E',
    },
  },
  styles: {
    global: {
      html: {
        overflowY: 'scroll',
        minHeight: '100%',
        //color: '#2a2a2a',
        //background: 'rgb(26, 32, 44)',
      },
      div: {
        borderColor: theme.colors.gray['300'],
      },
      a: {
        transition: '.2s ease-in-out all',
      },
    },
  },
});

export default customTheme;
