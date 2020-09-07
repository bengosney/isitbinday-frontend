import React from 'react';
import { useRouteMatch, Route, Switch, useLocation, Link } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';
import TaskList from '../widgets/TaskList';

const TaskSection = () => {
  const { path } = useRouteMatch();

  const getUrl = (slug) => {
    return `${path}/${slug}`.replace('//', '/');
  };

  const listUrl = getUrl('');
  const addUrl = getUrl('add');

  return (
    <React.Fragment>
      <Switch>
        <Route exact path={listUrl}>
          <h1>List</h1>
          <TaskList />
          <Button as={Link} to={addUrl}>
            Add
          </Button>
        </Route>
        <Route path={addUrl}>
          <h1>add</h1>
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default TaskSection;
