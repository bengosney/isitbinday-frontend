import Modal from './Modal';
import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import React, { useState, useEffect } from 'react';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';

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
