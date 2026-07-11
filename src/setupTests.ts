// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// pouchdb-browser needs IndexedDB, which jsdom doesn't provide
import '@testing-library/jest-dom/vitest';
import 'fake-indexeddb/auto';

// jsdom doesn't implement matchMedia; Chakra v3's useMediaQuery needs it
window.matchMedia = (query: string): MediaQueryList => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
});
