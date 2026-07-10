import Modal from './Modal';
import React from 'react';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';

interface BarcodeModalProps {
  onScan: (barcode: string) => void;
}

const BarcodeModal = ({ onScan }: BarcodeModalProps) => {
  return (
    <Modal open={true}>
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
