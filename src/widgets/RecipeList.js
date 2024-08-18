import { useApiFetch } from '../utils/apiFetch';
import { List, ListItem, ListIcon, Text } from '@chakra-ui/react';
import React from 'react';
import { BiFoodMenu } from 'react-icons/bi';
import { useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const apiResults = useApiFetch('api/recipes/recipe/');
  const { results: recipes = [] } = apiResults || {};

  const { path } = useRouteMatch();
  const getUrl = (slug) => {
    return `${path}/${slug}`.replace('//', '/');
  };

  return (
    <>
      <List>
        {recipes.map((recipe) => (
          <ListItem key={recipe.name}>
            <Link to={getUrl(recipe.slug)}>
              <Text fontSize="lg">
                <ListIcon as={BiFoodMenu} color="green.500" />
                {recipe.name}
              </Text>
              <Text fontSize="sm">{recipe.time}</Text>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default RecipeList;
