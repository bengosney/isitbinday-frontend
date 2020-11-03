import React from 'react';
import { useRouteMatch, Route, Switch, useHistory } from 'react-router-dom';
import TaskList from '../widgets/TaskList';
import FAB from '../widgets/FAB';
import { MdAdd } from 'react-icons/md';
import { Stack } from '@chakra-ui/core';

const TaskSection = () => {
  const { path } = useRouteMatch();

  const getUrl = (slug) => {
    return `${path}/${slug}`.replace('//', '/');
  };

  const listUrl = getUrl('');
  const newUrl = getUrl('new');

  const history = useHistory();

  return (
    <React.Fragment>
      <Switch>
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