import { useApiFetch } from '../utils/apiFetch';
import useTokens, { statusColor } from '../utils/useTokens';
import Loader from './Loader';
import { Button, Group, Flex, Stack, Text, Box } from '@chakra-ui/react';
import React, { useReducer } from 'react';

interface ArchiveListProps {
  limit?: number;
  offset?: number;
}

interface ArchiveState {
  limit: number;
  offset: number;
  url?: string;
}

interface ArchiveAction {
  url?: string;
  limit?: number;
  offset?: number;
}

const ArchiveList = ({ limit = 25, offset = 0 }: ArchiveListProps) => {
  const tokens = useTokens();
  const [state, dispatch] = useReducer(
    (state: ArchiveState, action: ArchiveAction): ArchiveState => {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = useApiFetch(url) as any;

  if (data === null) {
    return <Loader />;
  }

  const { results: archivedTasks = [] } = data;

  return (
    <Stack gap={2.5}>
      {archivedTasks.length === 0 && <Text color={tokens.textDim}>No archived tasks</Text>}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {archivedTasks.map((task: any) => {
        return (
          <Flex
            key={task.id}
            align="center"
            gap={3}
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
      <Group attached>
        <Button size="sm" variant="outline" onClick={() => dispatch({ url: data.previous })}>
          Previous
        </Button>
        <Button size="sm" variant="outline" onClick={() => dispatch({ url: data.next })}>
          Next
        </Button>
      </Group>
    </Stack>
  );
};

export default ArchiveList;
