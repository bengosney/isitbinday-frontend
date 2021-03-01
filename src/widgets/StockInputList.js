import React, { useState, useCallback, useEffect, useReducer, useRef } from 'react';
import apiFetch from '../utils/apiFetch';
import StockInput from './StockInput';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';

const StockInputList = () => {
  const lastScan = useRef(null);

  const ACTION_LOOKUP_ITEM = 'ACTION_LOOKUP_ITEM';
  const ACTION_ADD_ITEM = 'ACTION_ADD_ITEM';
  const ACTION_REMOVE_ITEM = 'ACTION_REMOVE_ITEM';

  const [stockList, dispatchStockListAction] = useReducer((state, action) => {
    switch (action.type) {
      case ACTION_LOOKUP_ITEM:
        apiFetch(`api/food/product/${action.code}/lookup/`).then((res) => addItem(res));
        break;
      case ACTION_ADD_ITEM:
        state.push(action.item);
        break;
      case ACTION_REMOVE_ITEM:
        break;
      default:
        throw new Error('unknown type');
    }
  }, []);

  const addItemByCode = (code) => dispatchStockListAction({ type: ACTION_LOOKUP_ITEM, code: code });
  const addItem = (item) => dispatchStockListAction({ type: ACTION_ADD_ITEM, item: item });

  return (
    <div>
      <div>Stock Input List</div>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          const { text = false } = result || {};
          if (text && text != lastScan.current) {
            lastScan.current = text;
            addItemByCode(text);
          }
        }}
      />
      <div>{lastScan.current}</div>
    </div>
  );
};

export default StockInputList;
