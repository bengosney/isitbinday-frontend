import usePageTitle from '../utils/usePageTitle';
import RecipeDetails from '../widgets/RecipeDetails';
import RecipeForm from '../widgets/RecipeForm';
import RecipeList from '../widgets/RecipeList';
import RecipeURLModal from '../widgets/RecipeURLModal';
import { Button, Flex, Heading, Spacer, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { Route, Routes, useNavigate } from 'react-router-dom';

const BASE_URL = '/iibd/recipes';

const RecipeSection = () => {
  usePageTitle('Recipes');
  const [refreshKey, setRefreshKey] = useState(0);
  const incrementRefreshKey = () => setRefreshKey((prevKey) => prevKey + 1);

  const urlUrl = `${BASE_URL}/from-url`;

  const navigate = useNavigate();

  const header = (
    <Flex align="center" mt={2}>
      <Heading fontSize="22px" fontWeight={600} letterSpacing="-.01em">
        Recipes
      </Heading>
      <Spacer />
      <Button size="sm" colorPalette="brand" onClick={() => navigate(urlUrl)}>
        <MdAdd />
        Add recipe
      </Button>
    </Flex>
  );

  return (
    <Routes>
      <Route
        path="add"
        element={
          <>
            {header}
            <RecipeForm />
          </>
        }
      />
      <Route
        path="from-url"
        element={
          <>
            {header}
            <Stack my={6}>
              <RecipeList refreshKey={refreshKey} />
              <RecipeURLModal onClose={() => incrementRefreshKey()} />
            </Stack>
          </>
        }
      />
      <Route path=":slug" element={<RecipeDetails />} />
      <Route
        index
        element={
          <>
            {header}
            <Stack my={6}>
              <RecipeList />
            </Stack>
          </>
        }
      />
    </Routes>
  );
};

export default RecipeSection;
