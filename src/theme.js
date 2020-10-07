import { theme } from '@chakra-ui/core';

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      50: '#f8eaff',
      100: '#e0c6ed',
      200: '#c7a2de',
      300: '#b17dcf',
      400: '#9b57c0',
      500: '#813fa7',
      600: '#653082',
      700: '#48225e',
      800: '#2c143a',
      900: '#110518',
    },
    default: {
      text: '#2a2a2a',
    },
    form: {
      error: '#E53E3E',
    },
  },
  styles: {
    ...theme.styles,
    global: {
      ...theme.styles.global,
      html: {
        ...theme.styles.global.html,
        overflowY: 'scroll',
        minHeight: '100%',
        color: '#2a2a2a',
      },
      div: {
        borderColor: theme.colors.gray['300'],
      },
      input: {
        ...theme.styles.global.input,
      },
      a: {
        ...theme.styles.global.a,
        transition: '.2s ease-in-out all',
      },
    },
  },
};

export default customTheme;
