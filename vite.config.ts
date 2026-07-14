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
        // Precache the built app shell so it loads offline.
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
        cleanupOutdatedCaches: true,
        // SPA: serve index.html for navigations the SW hasn't precached.
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            // Google Fonts stylesheets — refresh in the background, serve cached offline.
            urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
            },
          },
          {
            // Google Fonts webfont files — immutable, cache long-term.
            urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              cacheableResponse: { statuses: [0, 200] },
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
        ],
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
