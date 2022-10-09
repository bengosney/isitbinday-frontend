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
import RecipeURLModal from '../widgets/RecipeURLModal';

const RecipeSection = () => {
  usePageTitle('Recipes');
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
            <RecipeList />
            <RecipeURLModal />
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
