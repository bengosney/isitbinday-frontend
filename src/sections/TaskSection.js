import React, { useState } from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import TaskList from '../widgets/TaskList';
import NewTask from '../widgets/NewTask';
import { Stack } from '@chakra-ui/core';

const TaskSection = () => {
  const { path } = useRouteMatch();
  const [refresh, setRefresh] = useState(0);

  const getUrl = (slug) => {
    return `${path}/${slug}`.replace('//', '/');
  };

  const listUrl = getUrl('');
  const editUrl = getUrl(':id');

  return (
    <React.Fragment>
      <Switch>
        <Route exact path={listUrl}>
          <Stack my={6}>
            <TaskList refreshKey={refresh} />
            <NewTask postSave={() => setRefresh(refresh + 1)} />
          </Stack>
        </Route>
        <Route path={editUrl}>
          <h1>Edit</h1>
          <NewTask />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default TaskSection;
