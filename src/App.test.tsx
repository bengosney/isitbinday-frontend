import App from './App';
import { render } from '@testing-library/react';
import React from 'react';

test('renders the app shell', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/privacy policy/i);
  expect(linkElement).toBeInTheDocument();
});
