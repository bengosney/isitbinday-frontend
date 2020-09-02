import React, { useState, useContext } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import apiFetch from '../utils/apiFetch';

const TaskListScreen = () => {
  apiFetch('api/tasks/').then(data => console.log(data));

  return <h2>Task List</h2>;
};

export default TaskListScreen;
