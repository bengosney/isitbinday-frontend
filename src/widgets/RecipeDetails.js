import apiFetch, { useApiFetch } from '../utils/apiFetch';
import { round } from '../utils/numbers';
import { Stack, ListItem, ListIcon, OrderedList, Heading, Text, Box, useBreakpointValue } from '@chakra-ui/react';
import { Table, Tbody, Tr, Th, Td, Thead } from '@chakra-ui/react';
import React, { useCallback, useEffect, useReducer } from 'react';
import { BiFoodMenu, BiUser } from 'react-icons/bi';
import { useRouteMatch, Route, Switch, useHistory, useParams, Link } from 'react-router-dom';

const RecipeDetails = () => {
  const { slug } = useParams();
  const tableProps = useBreakpointValue({ base: {}, md: { lineHeight: 5, fontSize: 'md' } });
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
    <Stack spacing={5}>
      <Heading>{details.name}</Heading>
      <Text>{details.description}</Text>

      <Stack direction={{ base: 'column', md: 'row' }} spacing={6}>
        <Box>
          <SubHeading>Ingredients</SubHeading>
          <Table variant="striped" size={'sm'} {...tableProps}>
            <Thead>
              <Tr>
                <Th colSpan={2}>Quantity</Th>
                <Th>Ingredient</Th>
              </Tr>
            </Thead>
            <Tbody>
              {details.ingredients.map((ingredient) => (
                <Tr key={ingredient.id}>
                  <Td paddingRight={1} {...tableProps} isNumeric>
                    {round(ingredient.quantity)}
                  </Td>
                  <Td paddingLeft={1} {...tableProps}>
                    {ingredient.quantity_unit}
                  </Td>
                  <Td whiteSpace={{ base: 'wrap', md: 'nowrap' }} {...tableProps}>
                    {ingredient.name}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Box>
          <SubHeading>Instructions</SubHeading>
          <OrderedList spacing={5}>
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
