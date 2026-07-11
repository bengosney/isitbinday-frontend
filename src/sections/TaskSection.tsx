import usePageTitle from '../utils/usePageTitle';
import useTokens from '../utils/useTokens';
import ArchiveList from '../widgets/ArchiveList';
import TaskList from '../widgets/TaskList';
import { Button, Flex, Heading, Spacer, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useRouteMatch, Route, Switch, useHistory } from 'react-router-dom';

const TaskSection = () => {
  usePageTitle('Task List');
  const { path } = useRouteMatch();
  const tokens = useTokens();
  const [openCount, setOpenCount] = useState<number | null>(null);

  const getUrl = (slug: string) => {
    return slug ? `${path}/${slug}`.replace('//', '/') : path;
  };

  const listUrl = getUrl('');
  const newUrl = getUrl('new');
  const archiveUrl = getUrl('archived');

  const history = useHistory();

  return (
    <Switch>
      <Route path={archiveUrl}>
        <Flex align="center" mt={2} mb={6}>
          <Heading fontSize="22px" fontWeight={600} letterSpacing="-.01em">
            Archive
          </Heading>
          <Spacer />
          <Button size="sm" variant="outline" onClick={() => history.push(listUrl)}>
            Back to board
          </Button>
        </Flex>
        <ArchiveList />
      </Route>
      <Route path={listUrl}>
        <Flex align="center" mt={2} wrap="wrap" gap={2}>
          <Flex align="baseline" gap={3}>
            <Heading fontSize="22px" fontWeight={600} letterSpacing="-.01em">
              Tasks
            </Heading>
            {openCount !== null && (
              <Text fontFamily="mono" fontSize="11px" color={tokens.textDim}>
                {openCount} open
              </Text>
            )}
          </Flex>
          <Spacer />
          <Button size="sm" colorPalette="brand" onClick={() => history.push(newUrl)}>
            <MdAdd />New task
          </Button>
        </Flex>
        <Stack my={6}>
          <TaskList onCountChange={setOpenCount} />
        </Stack>
      </Route>
    </Switch>
  );
};

export default TaskSection;
