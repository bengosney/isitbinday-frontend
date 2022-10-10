import usePageTitle from '../utils/usePageTitle';
import ArchiveList from '../widgets/ArchiveList';
import FAB from '../widgets/FAB';
import TaskList from '../widgets/TaskList';
import { Heading, Stack } from '@chakra-ui/react';
import React from 'react';
import { MdAdd } from 'react-icons/md';
import { useRouteMatch, Route, Switch, useHistory } from 'react-router-dom';

const TaskSection = () => {
  usePageTitle('Task List');
  const { path } = useRouteMatch();

  const getUrl = (slug) => {
    return `${path}/${slug}`.replace('//', '/');
  };

  const listUrl = getUrl('');
  const newUrl = getUrl('new');
  const archiveUrl = getUrl('archived');

  const history = useHistory();

  return (
    <React.Fragment>
      <Heading>Tasks</Heading>
      <Switch>
        <Route path={archiveUrl}>
          <ArchiveList />
        </Route>
        <Route path={listUrl}>
          <Stack my={6}>
            <TaskList />
            <FAB onClick={() => history.push(newUrl)}>
              <MdAdd />
            </FAB>
          </Stack>
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default TaskSection;
