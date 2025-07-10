import usePageTitle from '../utils/usePageTitle';
import FAB from '../widgets/FAB';
import RecipeDetails from '../widgets/RecipeDetails';
import RecipeForm from '../widgets/RecipeForm';
import RecipeList from '../widgets/RecipeList';
import RecipeURLModal from '../widgets/RecipeURLModal';
import { Heading, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useRouteMatch, Route, Switch, useHistory } from 'react-router-dom';

const RecipeSection = () => {
  usePageTitle('Recipes');
  const [refreshKey, setRefreshKey] = useState(0);
  const incrementRefreshKey = () => setRefreshKey((prevKey) => prevKey + 1);
  const { path } = useRouteMatch();

  const getUrl = (slug) => {
    return `${path}/${slug}`.replace('//', '/');
  };

  const listUrl = getUrl('');
  const viewUrl = getUrl('/:slug');
  const addUrl = getUrl('add');
  const urlUrl = getUrl('from-url');

  const history = useHistory();

  return (
    <React.Fragment>
      <Heading>Recipes</Heading>
      <Switch>
        <Route path={addUrl}>
          <RecipeForm />
        </Route>
        <Route path={urlUrl}>
          <Stack my={6}>
            <RecipeList refreshKey={refreshKey} />
            <RecipeURLModal onClose={() => incrementRefreshKey()} />
          </Stack>
        </Route>
        <Route path={viewUrl}>
          <Stack my={6}>
            <RecipeDetails />
          </Stack>
        </Route>
        <Route path={listUrl}>
          <Stack my={6}>
            <RecipeList />
            <FAB onClick={() => history.push(urlUrl)}>
              <MdAdd />
            </FAB>
          </Stack>
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default RecipeSection;
