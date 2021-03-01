import React, { useCallback, useEffect, useReducer } from 'react';
import apiFetch, { useApiFetch } from '../utils/apiFetch';
import { UCFirst } from '../utils/string';
import { Stack, Grid, Text, Box, useBreakpointValue } from '@chakra-ui/react';

import StockInputList from './StockInputList';
import * as Yup from 'yup';
import { Redirect, useLocation } from 'react-router-dom';


const stateShape = Yup.object().shape({
  stocks: Yup.array().default([]),
  currentRefreshKey: Yup.number().default(0),
});

const StockList = ({ limit = 100, offset = 0 }) => {
  const [widgetState, dispatch] = useReducer((state, action) => {
    const makeState = (newState) => {
      const _newState = { ...state, ...newState };

      return stateShape.cast(_newState);
    };

    switch (action.type) {
      default:
        if (typeof state[action.type] !== 'undefined') {
          return makeState({ [action.type]: action.data || undefined });
        } else {
          throw new Error(`Unsupported action type: ${action.type}`);
        }
    }
  }, stateShape.cast({}));

  const { stocks, currentRefreshKey } = widgetState;

  const data = useApiFetch(`api/food/stock/?limit=${limit}&offset=${offset}`, null, `${currentRefreshKey}`);
  useEffect(() => {
    dispatch({ type: 'stocks', data: data?.results || undefined });
  }, [data]);

  return (
    <>
      <h1>Stock List</h1>
      <table>
        <thead>
          <tr><th>Qty</th><th>Brand</th><th>Name</th></tr>
        </thead>
        <tbody>
        {Object.values(
          stocks.reduce((acc, stock) => {
            const { quantity } = stock;
            stock.quantity = 0;
            const item = acc[stock.product.name] || stock;
            item.quantity += quantity;
            acc[stock.product.name] = item;
            return acc;
          }, {})
        ).map((stock) => (
          <tr key={stock.id}>
            <td>{stock.quantity}</td>
            <td>{stock.product.brand.name}</td>
            <td>{stock.product.name}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <StockInputList />
    </>
  );
};

export default StockList;
