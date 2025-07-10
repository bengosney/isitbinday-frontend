import { useApiFetch, apiFetch } from '../utils/apiFetch';
import { round } from '../utils/numbers';
import ConfirmDialog from './ConfirmDialog';
import {
  Stack,
  ListItem,
  OrderedList,
  Heading,
  Text,
  Box,
  useBreakpointValue,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { Table, Tbody, Tr, Th, Td, Thead } from '@chakra-ui/react';
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

const RecipeDetails = () => {
  const { slug } = useParams();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [error, setError] = React.useState(null);
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

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      console.log(`Recipe ${slug} deleted successfully.`);
      await apiFetch(`api/recipes/recipe/${slug}/`, null, 'DELETE');
      history.replace('/iibd/recipes');
    } catch (e) {
      setIsDeleting(false);
      setError(e.message);
      onClose();
    }
  };

  return (
    <Stack spacing={5}>
      {error && (
        <Box color="red.500" fontWeight="bold" mb={2}>
          {error}
        </Box>
      )}
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

      <Button colorScheme="red" onClick={onOpen} alignSelf="flex-end">
        Delete
      </Button>
      <ConfirmDialog
        title={`Delete Recipe`}
        body={`${details.name} will be deleted, you can't undo this action.`}
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        isLoading={isDeleting}
        onConfirm={handleDelete}
      />
    </Stack>
  );
};

export default RecipeDetails;
