declare module 'onscan.js' {
  interface OnScanOptions {
    onScan?: (barcode: string) => void;
    [key: string]: unknown;
  }
  const scannerInput: {
    attachTo(element: Document | HTMLElement, options: OnScanOptions): void;
    detachFrom(element: Document | HTMLElement): void;
  };
  export default scannerInput;
}
