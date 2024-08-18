import Modal from './Modal';
import React from 'react';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';

const BarcodeModal = ({ onScan }) => {
  return (
    <Modal isOpen={true}>
      <BarcodeScannerComponent
        onUpdate={(err, result) => {
          if (result) {
            onScan(result.text);
          }
        }}
      />
    </Modal>
  );
};

export default BarcodeModal;
