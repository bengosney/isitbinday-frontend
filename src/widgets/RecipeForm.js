import { RecipeSchema } from '../schemas/RecipeSchema';
import { Form } from '../utils/Form';
import apiFetch, { useApiFetch } from '../utils/apiFetch';
import { Text, Box, Stack, Button } from '@chakra-ui/react';
import { FieldArray } from 'formik';
import React, { useCallback, useEffect, useReducer, useState } from 'react';

const IngredientForm = () => {
  return <Text>IngredientForm</Text>;
};

const StepForm = () => {
  return <Text>StepForm</Text>;
};

const RecipeForm = ({ details = {} }) => {
  const jsonSchema = useApiFetch('openapi/?format=openapi-json');
  const units = useApiFetch('api/recipes/unit/');

  if (jsonSchema == null || units == null) {
    return <Text>Loading...</Text>;
  }

  const unitOptions = units.results.map((item) => ({ key: item.id, value: item.id, text: item.name }));

  return (
    <Form initialValues={RecipeSchema.cast(details, { stripUnknown: true })} validationSchema={RecipeSchema}>
      {(_, { values, ...rest }) => {
        return (
          <>
            <Form.Input name="Name" />
            <Form.Input name="Description" />
            <Form.Input name="Time to cook" />
            <FieldArray name="ingredients">
              {({ insert, remove, push }) => (
                <>
                  {values.ingredients.map((ingredient, index) => (
                    <Stack key={index} direction={'row'}>
                      <Box>{index}</Box>
                      <Form.Input name={`ingredients.name.${index}`} label={'Name'} />
                      <Form.Input name={`ingredients.quantity.${index}`} label={'Quantity'} type="number" />
                      <Form.Select name={`ingredients.unit.${index}`} label={'Unit'} options={unitOptions} />
                      <Button
                        onClick={() => {
                          remove(index);
                          console.log(`remove ${index}`);
                        }}
                      >
                        Remove
                      </Button>
                    </Stack>
                  ))}
                  <a href="#" onClick={() => push({ name: '', quantity: 0, unit: '' })}>
                    Add Ingredient
                  </a>
                </>
              )}
            </FieldArray>
            <StepForm />
          </>
        );
      }}
    </Form>
  );
};

export default RecipeForm;
