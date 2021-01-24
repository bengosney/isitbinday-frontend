import { Button, ButtonGroup, Heading, Stack, Text, Box } from '@chakra-ui/react';
import React, { useReducer } from 'react';
import { useApiFetch } from '../utils/apiFetch';
import Loader from './Loader';

const ArchiveList = ({ limit = 25, offset = 0 }) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      const { url, limit, offset } = action;
      const newState = { ...state };

      if (limit) {
        newState.limit = limit;
      }

      if (offset) {
        newState.offset = offset;
      }

      if (url) {
        newState.url = url;
      } else {
        newState.url = `api/tasks/archived-tasks/?limit=${limit}&offset=${offset}`;
      }

      return newState;
    },
    { limit, offset }
  );

  const { url = `api/tasks/archived-tasks/?limit=${limit}&offset=${offset}` } = state;
  const data = useApiFetch(url);

  if (data === null) {
    return <Loader />;
  }

  const { results: archivedTasks = [], next, previous } = data;

  return (
    <Stack>
      <Heading>ArchiveList</Heading>
      {archivedTasks.map((task) => {
        return (
          <Box>
            <Text key={task.id}>
              {task.title} - {task.previous_state}
            </Text>
          </Box>
        );
      })}
      <ButtonGroup isAttached>
        <Button onClick={() => dispatch({ url: data.previous })}>Previous</Button>
        <Button onClick={() => dispatch({ url: data.next })}>Next</Button>
      </ButtonGroup>
    </Stack>
  );
};

export default ArchiveList;
