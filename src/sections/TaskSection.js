import React, { useState } from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import TaskList from '../widgets/TaskList';
import NewTask from '../widgets/NewTask';

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
          <h1>List</h1>
          <Segment>
            <TaskList refreshKey={refresh} />
          </Segment>
          <Segment>
            <NewTask postSave={() => setRefresh(refresh + 1)} />
          </Segment>
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
