import scannerInput from 'onscan.js';
import React, { useState, useEffect } from 'react';

const BarcodeInput = ({ onScan = (barcode) => console.log(`Scanned ${barcode}`) }) => {
  useEffect(() => {
    console.log('mount scan');
    scannerInput.attachTo(document, {
      onScan: onScan,
    });

    return () => {
      console.log('unmount scan');
      scannerInput.detachFrom(document);
    };
  }, []);

  return null;
};

export default BarcodeInput;
