import React, { useEffect, useState, useRef } from 'react';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';
import apiFetch, { useApiFetch } from '../utils/apiFetch';

const Scanner = ({ onChange }) => {
  const [data, setData] = useState(null);
  const timeoutRef = useRef();

  useEffect(() => {
    if (onChange) {
      onChange(data);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setData(), 500);
    }
  }, [data]);

  return (
    <BarcodeScannerComponent
      width={500}
      height={500}
      onUpdate={(err, result) => {
        if (result) {
          setData(result.text);
        }
      }}
    />
  );
};

const Test = () => {
  const [data, setData] = useState();
  const [result, setResult] = useState();

  useEffect(() => {
    const f = async () => {
      if (data) {
        // const url = `api/food/product/${data}/lookup/`;
        const url = `api/food/product/${data}/transfer_in/`;
        const res = await apiFetch(url);
        setResult(res);
        console.log('res', res);
      }
    };
    f();
  }, [data]);

  return (
    <div>
      <Scanner onChange={(data) => setData(data)} />
      <div>{data}</div>
    </div>
  );
};

export default Test;
