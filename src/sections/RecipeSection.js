import React from 'react';
import { useRouteMatch, Route, Switch, useHistory } from 'react-router-dom';
import BookList from '../widgets/BookList';
import FAB from '../widgets/FAB';
import { MdAdd } from 'react-icons/md';
import { Heading, Stack } from '@chakra-ui/react';
import usePageTitle from '../utils/usePageTitle';
import RecipeList from '../widgets/RecipeList';
import RecipeDetails from '../widgets/RecipeDetails';
import RecipeForm from '../widgets/RecipeForm';

const RecipeSection = () => {
  usePageTitle('Recipes');
  const { path } = useRouteMatch();

  const getUrl = (slug) => {
    return `${path}/${slug}`.replace('//', '/');
  };

  const listUrl = getUrl('');
  const viewUrl = getUrl('/:slug');
  const addUrl = getUrl('add');

  const history = useHistory();

  return (
    <React.Fragment>
      <Heading>Recipes</Heading>
      <Switch>
        <Route path={addUrl}>
          <RecipeForm />
        </Route>
        <Route path={viewUrl}>
            <Stack my={6}>
                <RecipeDetails />
            </Stack>
        </Route>
        <Route path={listUrl}>
          <Stack my={6}>
            <RecipeList />
          </Stack>
        </Route>
      </Switch>
    </React.Fragment>
  );};

export default RecipeSection;
