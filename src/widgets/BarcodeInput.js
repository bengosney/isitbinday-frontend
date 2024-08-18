import scannerInput from 'onscan.js';
import React, { useState, useEffect } from 'react';

const BarcodeInput = ({ onScan = (barcode) => console.log(`Scanned ${barcode}`) }) => {
  useEffect(() => {
    scannerInput.attachTo(document, {
      onScan: onScan,
    });

    return () => {
      scannerInput.detachFrom(document);
    };
  }, []);

  return null;
};

export default BarcodeInput;
