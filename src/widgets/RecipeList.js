import { useApiFetch } from '../utils/apiFetch';
import useTokens from '../utils/useTokens';
import { Box, Flex, Grid, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { BiFoodMenu } from 'react-icons/bi';
import { useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';

const RecipeList = ({ refreshKey = 0 }) => {
  const tokens = useTokens();
  const apiResults = useApiFetch('api/recipes/recipe/', null, refreshKey);
  const { results: recipes = [] } = apiResults || {};

  const { path } = useRouteMatch();
  const getUrl = (slug) => {
    return `${path}/${slug}`.replace('//', '/');
  };

  if (apiResults !== null && recipes.length === 0) {
    return <Text color={tokens.textDim}>No recipes yet</Text>;
  }

  return (
    <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4}>
      {recipes.map((recipe) => (
        <Box
          key={recipe.slug}
          as={Link}
          to={getUrl(recipe.slug)}
          background={tokens.surface}
          border="1px solid"
          borderColor={tokens.border}
          borderRadius="14px"
          paddingX={5}
          paddingY={4}
          transition=".15s ease-in-out border-color, .15s ease-in-out background"
          _hover={{ borderColor: tokens.borderStrong, background: tokens.hoverBg }}
        >
          <Flex align="flex-start" gridGap={3}>
            <Flex
              width="32px"
              height="32px"
              borderRadius="9px"
              background={tokens.accentSoft}
              color={tokens.accentText}
              align="center"
              justify="center"
              flex="none"
              fontSize="16px"
            >
              <BiFoodMenu />
            </Flex>
            <Stack spacing={1} minW={0}>
              <Text fontSize="14px" fontWeight={600} lineHeight={1.4} wordBreak="break-word">
                {recipe.name}
              </Text>
              {recipe.time && (
                <Text fontFamily="mono" fontSize="11px" color={tokens.textDim}>
                  {recipe.time}
                </Text>
              )}
            </Stack>
          </Flex>
        </Box>
      ))}
    </Grid>
  );
};

export default RecipeList;
