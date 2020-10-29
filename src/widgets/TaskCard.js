import React from 'react';
import { Box, Text, Heading, Stack, IconButton } from '@chakra-ui/core';
import { MdModeEdit } from 'react-icons/md';
import { Link, useRouteMatch } from 'react-router-dom';

const TaskCard = ({ task }) => {
  const { id, title, effort, state, due } = task;
  const { path } = useRouteMatch();

  return (
    <>
      <Box key={`${state}-${id}`} border="1px solid lightgray" padding={5} background={'gray.50'}>
        <Stack>
          <Heading fontSize={'1em'}>{title}</Heading>
          <Stack direction={'row'} justify={'space-between'}>
            <Stack>
              <Text>{`Effort: ${effort || '-'}`}</Text>
              <Text>{`Due: ${due || '-'}`}</Text>
            </Stack>
            <Link to={`${path}/${id}`.replace('//', '/')}>
              <IconButton colorScheme={'blue'} size={'sm'} aria-label="Edit" icon={<MdModeEdit />} />
            </Link>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default TaskCard;
