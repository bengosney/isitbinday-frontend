import React, { useCallback, useEffect, useReducer } from 'react';
import apiFetch, { useApiFetch } from '../utils/apiFetch';
import { List, ListItem, ListIcon, OrderedList, UnorderedList, Text } from '@chakra-ui/react';
import { Table, Tbody, Tr, Th, Td, TableCaption, Thead } from '@chakra-ui/react';
import { BiFoodMenu, BiUser } from 'react-icons/bi';
import { useRouteMatch, Route, Switch, useHistory, useParams, Link } from 'react-router-dom';

const RecipeDetails = () => {
  const { slug } = useParams();
  const details = useApiFetch(`api/recipes/recipe/${slug}`);

  if (details === null) {
    return <div>Loading...</div>;
  }
  console.log('details', details);
  return (
    <div>
      <h1>{details.name}</h1>
      <div>{details.description}</div>

      <Table>
        <Thead>
          <Tr>
            <Th>Ingredient</Th>
            <Th>Quantity</Th>
            <Th>Unit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {details.ingredients.map((ingredient) => (
            <Tr key={ingredient.id}>
              <Td>{ingredient.name}</Td>
              <Td>{Math.floor(ingredient.quantity_metric)}</Td>
              <Td>{ingredient.quantity_metric_unit}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ol>
        {details.steps.map((step) => (
          <li key={step.id}>{step.description}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetails;
