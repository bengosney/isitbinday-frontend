import React from 'react';
import { useApiFetch } from '../utils/apiFetch';

const TaskList = ({refreshKey = 0}) => {
  const data = useApiFetch('api/tasks/', null, refreshKey);

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
