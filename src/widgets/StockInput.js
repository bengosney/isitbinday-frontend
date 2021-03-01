import React, { useState, useCallback, useEffect, useReducer } from 'react';
import { Input, Button } from '@chakra-ui/react';
import apiFetch, { useApiFetch } from '../utils/apiFetch';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';

const lookupProduct = async (code) => {
  const product = await apiFetch(`/api/food/product/${code}/lookup/`);
};

const Scanner = (onChange, width = 250, height = 250, scanDelay = 500) => {
  const green = '#0f0';
  const red = '#f00';
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [borderColour, setBorderColour] = useState(red);
  const border = `${borderColour} 2px solid`;
  const [timeoutHandle, setTimeoutHandle] = useState(null);

  const flashBorder = () => {
    clearTimeout(timeoutHandle);
    setTimeoutHandle(setTimeout(() => setBorderColour(red)), 500);
    setBorderColour(green);
  }

  useEffect(() => {
    if (typeof onChange == 'function') {
      onChange(data);
    }
    flashBorder();
  }, [onChange, data]);

  useEffect(() => {
    return () => clearTimeout(timeoutHandle);
  }, []);

  return (
    <div style={{border}}>
      <BarcodeScannerComponent
        width={width}
        height={height}
        onUpdate={(err, result) => {
          if (result && err == null) {
            setData(result.text);
          } else {
            setData(null);
          }
          setError(`${err}`);
        }}
      />
      <div>{ data }</div>
      <div>{ error }</div>
    </div>
  );
};

const StockInput = () => {
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');

  const add = () => {
    apiFetch(`api/food/product/${code}/transfer_in/`).then(() => setMsg('added'));
  };

  // <Scanner onChange={(data) => console.log('scan data', data)} />
  return (
    <div>
      <Input as={'input'} value={code} onChange={(e) => setCode(e.target.value)} />
      <Button onClick={add}>Add</Button>
      <p>{msg}</p>
    </div>
  );
};

export default StockInput;
