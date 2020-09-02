import React from 'react';
import { useRouteMatch, Route } from 'react-router-dom';
import TaskListScreen from './TaskListScreen';

const LoggedInScreen = () => {
  const { path, url } = useRouteMatch();

  return (
    <React.Fragment>
      <Route exact path={`${path}`}>
        <div>
          <div>
            <h1>Home</h1>
          </div>
        </div>
      </Route>
      <Route path={`${path}/tasks`}>
          <TaskListScreen />
      </Route>
    </React.Fragment>
  );
};

export default LoggedInScreen;
