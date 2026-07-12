import { useApiFetch, apiFetch } from '../utils/apiFetch';
import { round } from '../utils/numbers';
import useTokens from '../utils/useTokens';
import ConfirmDialog from './ConfirmDialog';
import Loader from './Loader';
import {
  Stack,
  Flex,
  Grid,
  Heading,
  Text,
  Box,
  Button,
  Link as ChakraLink,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const RecipeDetails = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const { open, onOpen, onClose } = useDisclosure();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const tokens = useTokens();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const details = useApiFetch(`api/recipes/recipe/${slug}`) as any;

  if (details === null) {
    return <Loader />;
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await apiFetch(`api/recipes/recipe/${slug}/`, null, 'DELETE');
      navigate('/iibd/recipes', { replace: true });
    } catch (e) {
      setIsDeleting(false);
      setError((e as Error).message);
      onClose();
    }
  };

  return (
    <Stack gap={4} marginTop={2}>
      {error && (
        <Box color={tokens.dangerText} fontWeight="bold">
          {error}
        </Box>
      )}
      <Text fontFamily="mono" fontSize="11px" color={tokens.textDim}>
        <Link to="/iibd/recipes">
          <ChakraLink as="span" color={tokens.accentText}>
            Recipes
          </ChakraLink>
        </Link>
        {' / '}
        {slug}
      </Text>
      <Flex align="flex-start" gap={5}>
        <Heading fontSize={{ base: '26px', md: '32px' }} fontWeight={600} letterSpacing="-.02em" lineHeight={1.15}>
          {details.name}
        </Heading>
        <Spacer />
        <Button
          size="sm"
          variant="outline"
          color={tokens.dangerText}
          borderColor={tokens.dangerText}
          _hover={{ background: tokens.dangerSoft }}
          onClick={onOpen}
          flex="none"
        >
          Delete recipe
        </Button>
      </Flex>
      {details.description && (
        <Text maxWidth="640px" fontSize="14.5px" lineHeight={1.6} color={tokens.textMuted}>
          {details.description}
        </Text>
      )}
      <Text fontFamily="mono" fontSize="11px" color={tokens.textDim}>
        {details.ingredients.length} ingredients · {details.steps.length} steps
      </Text>
      <Grid
        templateColumns={{ base: '1fr', lg: '400px 1fr' }}
        gap={{ base: 8, lg: 14 }}
        alignItems="start"
        paddingTop={3}
      >
        <Box
          background={tokens.surface}
          border="1px solid"
          borderColor={tokens.border}
          borderRadius="14px"
          paddingX={6}
          paddingY={5}
        >
          <Text fontSize="14px" fontWeight={600} marginBottom={3}>
            Ingredients
          </Text>
          <Stack gap={0}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {details.ingredients.map((ingredient: any, index: number) => (
              <Grid
                key={ingredient.id}
                templateColumns="110px 1fr"
                gap={3.5}
                paddingY={2}
                borderBottom={index < details.ingredients.length - 1 ? '1px solid' : 'none'}
                borderBottomColor={tokens.border}
              >
                <Text fontFamily="mono" fontSize="12px" color={tokens.textMuted} textAlign="right">
                  {ingredient.quantity ? `${round(ingredient.quantity)} ${ingredient.quantity_unit || ''}`.trim() : '—'}
                </Text>
                <Text fontSize="13.5px">{ingredient.name}</Text>
              </Grid>
            ))}
          </Stack>
        </Box>
        <Stack gap={5}>
          <Text fontSize="14px" fontWeight={600}>
            Instructions
          </Text>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {details.steps.map((step: any, index: number) => (
            <Flex key={step.id} gap={4}>
              <Flex
                flex="none"
                width="26px"
                height="26px"
                borderRadius="full"
                background={tokens.accentSoft}
                color={tokens.accentText}
                fontFamily="mono"
                fontSize="12px"
                align="center"
                justify="center"
              >
                {index + 1}
              </Flex>
              <Text fontSize="14px" lineHeight={1.65} color={tokens.textBody} paddingTop="2px">
                {step.description}
              </Text>
            </Flex>
          ))}
        </Stack>
      </Grid>
      <ConfirmDialog
        title={`Delete Recipe`}
        body={`${details.name} will be deleted, you can't undo this action.`}
        open={open}
        onClose={onClose}
        loading={isDeleting}
        onConfirm={handleDelete}
      />
    </Stack>
  );
};

export default RecipeDetails;
