import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50:  { value: '#EEF0FE' },
          100: { value: '#DDE1FD' },
          200: { value: '#C3C9FB' },
          300: { value: '#A5AEFA' },
          400: { value: '#98A2FF' },
          500: { value: '#7B87F7' },
          600: { value: '#5F6BE0' },
          700: { value: '#4A54B8' },
          800: { value: '#363E8A' },
          900: { value: '#232858' },
        },
      },
      fonts: {
        heading: { value: "'Instrument Sans', system-ui, -apple-system, sans-serif" },
        body:    { value: "'Instrument Sans', system-ui, -apple-system, sans-serif" },
        mono:    { value: "'JetBrains Mono', Menlo, Consolas, 'Courier New', monospace" },
      },
    },
    semanticTokens: {
      colors: {
        'form.error': { value: { base: '#E53E3E', _dark: '#E53E3E' } },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
