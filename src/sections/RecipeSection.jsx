import usePageTitle from '../utils/usePageTitle';
import RecipeDetails from '../widgets/RecipeDetails';
import RecipeForm from '../widgets/RecipeForm';
import RecipeList from '../widgets/RecipeList';
import RecipeURLModal from '../widgets/RecipeURLModal';
import { Button, Flex, Heading, Spacer, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useRouteMatch, Route, Switch, useHistory } from 'react-router-dom';

const RecipeSection = () => {
  usePageTitle('Recipes');
  const [refreshKey, setRefreshKey] = useState(0);
  const incrementRefreshKey = () => setRefreshKey((prevKey) => prevKey + 1);
  const { path } = useRouteMatch();

  const getUrl = (slug) => {
    return slug ? `${path}/${slug}`.replace('//', '/') : path;
  };

  const listUrl = getUrl('');
  const viewUrl = getUrl('/:slug');
  const addUrl = getUrl('add');
  const urlUrl = getUrl('from-url');

  const history = useHistory();

  const header = (
    <Flex align="center" mt={2}>
      <Heading fontSize="22px" fontWeight={600} letterSpacing="-.01em">
        Recipes
      </Heading>
      <Spacer />
      <Button size="sm" colorPalette="brand" onClick={() => history.push(urlUrl)}>
        <MdAdd />Add recipe
      </Button>
    </Flex>
  );

  return (
    <React.Fragment>
      <Switch>
        <Route path={addUrl}>
          {header}
          <RecipeForm />
        </Route>
        <Route path={urlUrl}>
          {header}
          <Stack my={6}>
            <RecipeList refreshKey={refreshKey} />
            <RecipeURLModal onClose={() => incrementRefreshKey()} />
          </Stack>
        </Route>
        <Route path={viewUrl}>
          <RecipeDetails />
        </Route>
        <Route path={listUrl}>
          {header}
          <Stack my={6}>
            <RecipeList />
          </Stack>
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default RecipeSection;
