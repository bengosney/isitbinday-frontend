import React from 'react';
import { Box, Text, Heading, Stack, IconButton, Badge } from '@chakra-ui/react';
import { MdModeEdit, MdDone } from 'react-icons/md';
import apiFetch from '../utils/apiFetch';
import { Link, useRouteMatch } from 'react-router-dom';

const TaskCard = ({ task, showDueDate = true, onSateChange = null }) => {
  const { id, title, state, due_date, available_state_transitions, tags } = task;
  const { path } = useRouteMatch();

  let due = null;
  if (due_date) {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const dateObj = new Date(due_date);
    const days = Math.floor((dateObj.getTime() - new Date().getTime()) / 8.64e7);
    due = <abbr title={`${dateObj.toDateString()}`}>{rtf.format(days, 'days')}</abbr>;
  }

  const toDone = () => {
    apiFetch(`api/tasks/tasks/${id}/done/`).then(() => onSateChange('done'));
  };

  return (
    <>
      <Box key={`${state}-${id}`} border="1px solid lightgray" padding={4} background={'gray.50'}>
        <Stack>
          <Stack direction={'row'} justify={'space-between'}>
            <Stack>
              <Heading fontSize={'1em'}>{title}</Heading>
              {showDueDate && due && <Text>Due: {due}</Text>}
              <Stack direction={'row'}>
                {tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
              </Stack>
            </Stack>
            <Stack>
              <Link to={`${path}/edit/${id}`.replace('//', '/')}>
                <IconButton colorScheme={'blue'} size={'sm'} aria-label="Edit" icon={<MdModeEdit />} />
              </Link>
              {available_state_transitions.includes('done') ? (
                <IconButton
                  onClick={() => toDone()}
                  colorScheme={'green'}
                  size={'sm'}
                  aria-label="Done"
                  icon={<MdDone />}
                />
              ) : null}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default TaskCard;
