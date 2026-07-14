/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { createRequire } from 'node:module';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifestFilename: 'manifest.json',
      manifest: {
        name: 'Is it bin day?',
        short_name: 'isitbinday',
        description: 'A practical task list',
        start_url: '/iibd',
        display: 'standalone',
        theme_color: '#7B87F7',
        background_color: '#ffffff',
        icons: [
          {
            src: '/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        shortcuts: [
          {
            name: 'Task List',
            short_name: 'Tasks',
            description: 'The task list',
            url: '/iibd/tasks',
            icons: [{ src: '/web-app-manifest-192x192.png', sizes: '192x192' }],
          },
        ],
      },
      workbox: {
        // SPA: serve index.html for navigations the SW hasn't precached
        navigateFallback: '/index.html',
      },
    }),
  ],
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
