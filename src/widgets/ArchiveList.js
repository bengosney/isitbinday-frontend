import { useApiFetch } from '../utils/apiFetch';
import useTokens, { statusColor } from '../utils/useTokens';
import Loader from './Loader';
import { Button, ButtonGroup, Flex, Stack, Text, Box } from '@chakra-ui/react';
import React, { useReducer } from 'react';

const ArchiveList = ({ limit = 25, offset = 0 }) => {
  const tokens = useTokens();
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

  const { results: archivedTasks = [] } = data;

  return (
    <Stack spacing={2.5}>
      {archivedTasks.length === 0 && <Text color={tokens.textDim}>No archived tasks</Text>}
      {archivedTasks.map((task) => {
        return (
          <Flex
            key={task.id}
            align="center"
            gridGap={3}
            border="1px solid"
            borderColor={tokens.border}
            borderRadius="10px"
            background={tokens.surfaceMuted}
            paddingX="15px"
            paddingY="13px"
          >
            <Box
              width="8px"
              height="8px"
              borderRadius="full"
              background={statusColor(task.previous_state)}
              flex="none"
            />
            <Text fontSize="14px" fontWeight={500} wordBreak="break-word" color={tokens.textMuted}>
              {task.title}
            </Text>
            <Text
              marginLeft="auto"
              fontFamily="mono"
              fontSize="10.5px"
              textTransform="uppercase"
              letterSpacing=".06em"
              color={tokens.textDim}
              flex="none"
            >
              {task.previous_state}
            </Text>
          </Flex>
        );
      })}
      <ButtonGroup isAttached>
        <Button size="sm" variant="outline" onClick={() => dispatch({ url: data.previous })}>
          Previous
        </Button>
        <Button size="sm" variant="outline" onClick={() => dispatch({ url: data.next })}>
          Next
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default ArchiveList;
