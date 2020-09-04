import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { useApiFetch } from '../utils/apiFetch';

const TaskList = () => {
  const data = useApiFetch('api/tasks/');

  if (data == null) {
    return <div>Loading</div>;
  }

  const {results} = data;

  return (
    <React.Fragment>
      <ul>
        {results.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default TaskList;
