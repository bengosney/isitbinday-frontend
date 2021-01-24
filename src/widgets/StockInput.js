import React, { useState, useCallback, useEffect, useReducer } from 'react';
import { Input, Button } from '@chakra-ui/react';
import apiFetch, { useApiFetch } from '../utils/apiFetch';

const lookupProduct = async (code) => {
  const product = await apiFetch(`/api/food/product/${code}/lookup/`);
};

const StockInput = () => {
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');

  const add = () => {
    apiFetch(`api/food/product/${code}/transfer_in/`).then(() => setMsg('added'));
  };

  return (
    <div>
      <Input as={'input'} value={code} onChange={(e) => setCode(e.target.value)} />
      <Button onClick={add}>Add</Button>
      <p>{msg}</p>
    </div>
  );
};

export default StockInput;
