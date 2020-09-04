import React, { useState, useContext } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import apiFetch from '../utils/apiFetch';
import TaskList from '../widgets/TaskList';

const TaskListScreen = () => {
  return (
    <React.Fragment>
      <h2>Task List</h2>
      <TaskList />
    </React.Fragment>
  );
};

export default TaskListScreen;
