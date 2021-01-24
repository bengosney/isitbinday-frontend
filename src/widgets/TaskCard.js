import React from 'react';
import { Box, Text, Heading, Stack, IconButton } from '@chakra-ui/react';
import { MdModeEdit } from 'react-icons/md';
import { Link, useRouteMatch } from 'react-router-dom';

const TaskCard = ({ task, showDueDate = true }) => {
  const { id, title, effort, state, due_date } = task;
  const { path } = useRouteMatch();

  let due = '-';
  if (due_date) {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const dateObj = new Date(due_date);
    const days = Math.floor((dateObj.getTime() - new Date().getTime()) / 8.64e7);
    due = <abbr title={`${dateObj.toDateString()}`}>{rtf.format(days, 'days')}</abbr>;
  }

  return (
    <>
      <Box key={`${state}-${id}`} border="1px solid lightgray" padding={5} background={'gray.50'}>
        <Stack>
          <Heading fontSize={'1em'}>{title}</Heading>
          <Stack direction={'row'} justify={'space-between'}>
            <Stack>
              <Text>{`Effort: ${effort || '-'}`}</Text>
              {showDueDate && <Text>Due: {due}</Text>}
            </Stack>
            <Link to={`${path}/edit/${id}`.replace('//', '/')}>
              <IconButton colorScheme={'blue'} size={'sm'} aria-label="Edit" icon={<MdModeEdit />} />
            </Link>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default TaskCard;
