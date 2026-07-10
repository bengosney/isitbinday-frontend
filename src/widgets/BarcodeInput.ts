import scannerInput from 'onscan.js';
import { useEffect, useRef } from 'react';

interface BarcodeInputProps {
  onScan?: (barcode: string) => void;
}

const BarcodeInput = ({ onScan = (barcode: string) => console.log(`Scanned ${barcode}`) }: BarcodeInputProps): null => {
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
