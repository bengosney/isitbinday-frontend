declare module '@testing-library/react' {
  import * as React from 'react';
  export function render(ui: React.ReactElement, options?: Record<string, unknown>): {
    getByText: (text: string | RegExp) => HTMLElement;
    [key: string]: unknown;
  };
}
