/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { createRequire } from 'node:module';
import { defineConfig } from 'vite';

const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [react()],
  define: {
    // pouchdb and friends expect the node "global" object
    global: 'globalThis',
  },
  resolve: {
    alias: {
      // pouchdb-browser imports the node builtin "events"; point it at the
      // browser polyfill instead of Vite's throwing external stub.
      events: require.resolve('events/'),
    },
  },
  server: {
    port: 3000,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'src/setupTests.ts',
  },
});
