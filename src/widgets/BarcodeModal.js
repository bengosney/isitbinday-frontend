import React, { useState, useEffect } from 'react';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';
import Modal from './Modal';

import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';

const BarcodeModal = ({ onScan, onClose, ...rest }) => {
  const [scanning, setScanning] = useState(true);
  const close = () => {
    setScanning(false);
    if (typeof onClose === 'function') {
      setTimeout(() => onClose(), 100);
    }
  };

  return (
    <Modal isOpen={true}>
      {scanning && (
        <BarcodeScannerComponent
          onUpdate={(err, result) => {
            if (result) {
              onScan(result.text);
            }
          }}
        />
      )}
    </Modal>
  );
};

export default BarcodeModal;
