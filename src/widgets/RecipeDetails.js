import apiFetch, { useApiFetch } from '../utils/apiFetch';
import { round } from '../utils/numbers';
import { Stack, ListItem, ListIcon, OrderedList, Heading, Text, Box } from '@chakra-ui/react';
import { Table, Tbody, Tr, Th, Td, Thead } from '@chakra-ui/react';
import React, { useCallback, useEffect, useReducer } from 'react';
import { BiFoodMenu, BiUser } from 'react-icons/bi';
import { useRouteMatch, Route, Switch, useHistory, useParams, Link } from 'react-router-dom';

const RecipeDetails = () => {
  const { slug } = useParams();
  const details = useApiFetch(`api/recipes/recipe/${slug}`);

  if (details === null) {
    return <div>Loading...</div>;
  }

  const SubHeading = ({ children, ...props }) => (
    <Heading as="h3" size="md" paddingBottom="3" {...props}>
      {children}
    </Heading>
  );

  const Section = ({ children, ...props }) => (
    <Box paddingTop="5" {...props}>
      {children}
    </Box>
  );

  return (
    <Stack>
      <Heading>{details.name}</Heading>
      <Text>{details.description}</Text>

      <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
        <Box>
          <SubHeading>Ingredients</SubHeading>
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
                  <Td>{round(ingredient.quantity)}</Td>
                  <Td>{ingredient.quantity_unit}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Box>
          <SubHeading>Instructions</SubHeading>
          <OrderedList>
            {details.steps.map((step) => (
              <ListItem paddingBottom="2" key={step.id}>
                {step.description}
              </ListItem>
            ))}
          </OrderedList>
        </Box>
      </Stack>
    </Stack>
  );
};

export default RecipeDetails;
