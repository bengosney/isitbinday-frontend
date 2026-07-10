import scannerInput from 'onscan.js';
import { useEffect, useRef } from 'react';

const BarcodeInput = ({ onScan = (barcode) => console.log(`Scanned ${barcode}`) }) => {
  const onScanRef = useRef(onScan);
  onScanRef.current = onScan;

  useEffect(() => {
    scannerInput.attachTo(document, {
      onScan: (barcode) => onScanRef.current(barcode),
    });

    return () => {
      scannerInput.detachFrom(document);
    };
  }, []);

  return null;
};

export default BarcodeInput;
