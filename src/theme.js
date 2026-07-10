import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const customTheme = extendTheme({
  colors: {
    brand: {
      50: '#EEF0FE',
      100: '#DDE1FD',
      200: '#C3C9FB',
      300: '#A5AEFA',
      400: '#98A2FF',
      500: '#7B87F7',
      600: '#5F6BE0',
      700: '#4A54B8',
      800: '#363E8A',
      900: '#232858',
    },
    default: {
      text: '#E6E9EF',
    },
    form: {
      error: '#E53E3E',
    },
  },
  fonts: {
    heading: "'Instrument Sans', system-ui, -apple-system, sans-serif",
    body: "'Instrument Sans', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', Menlo, Consolas, 'Courier New', monospace",
  },
  styles: {
    global: (props) => ({
      html: {
        overflowY: 'scroll',
        minHeight: '100%',
      },
      body: {
        bg: mode('#F6F6F4', '#0E1116')(props),
        color: mode('#1A1D23', '#E6E9EF')(props),
      },
      a: {
        transition: '.2s ease-in-out all',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: '8px',
      },
      variants: {
        solid: (props) =>
          props.colorScheme === 'brand'
            ? {
                bg: 'brand.500',
                color: '#0B0E14',
                _hover: { bg: 'brand.400' },
                _active: { bg: 'brand.600' },
              }
            : {},
      },
    },
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          bg: mode('white', '#161B22')(props),
          border: '1px solid',
          borderColor: mode('rgba(0,0,0,.1)', 'rgba(255,255,255,.09)')(props),
          borderRadius: '14px',
          boxShadow: '0 24px 60px rgba(0,0,0,.5)',
        },
      }),
    },
    Input: {
      variants: {
        outline: (props) => ({
          field: {
            bg: mode('white', '#0F1319')(props),
            borderColor: mode('rgba(0,0,0,.12)', 'rgba(255,255,255,.09)')(props),
            borderRadius: '9px',
            _hover: { borderColor: mode('rgba(0,0,0,.24)', 'rgba(255,255,255,.18)')(props) },
            _focus: { borderColor: 'brand.500', boxShadow: '0 0 0 3px rgba(123,135,247,.15)' },
          },
        }),
      },
    },
    Select: {
      variants: {
        outline: (props) => ({
          field: {
            bg: mode('white', '#0F1319')(props),
            borderColor: mode('rgba(0,0,0,.12)', 'rgba(255,255,255,.09)')(props),
            borderRadius: '9px',
            _hover: { borderColor: mode('rgba(0,0,0,.24)', 'rgba(255,255,255,.18)')(props) },
            _focus: { borderColor: 'brand.500', boxShadow: '0 0 0 3px rgba(123,135,247,.15)' },
          },
        }),
      },
    },
  },
  config: {
    initialColorMode: 'dark',
    //useSystemColorMode: true,
  },
});

export default customTheme;
