declare module 'react-webcam-barcode-scanner' {
  import * as React from 'react';
  interface Result { text: string; }
  interface Props {
    onUpdate: (error: unknown, result?: Result) => void;
    width?: number | string;
    height?: number | string;
  }
  const BarcodeScannerComponent: React.FC<Props>;
  export default BarcodeScannerComponent;
}
