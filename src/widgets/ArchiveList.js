import React from 'react';
import { useApiFetch } from '../utils/apiFetch';
import Loader from './Loader';

const ArchiveList = ({limit = 50, offset = 0}) => {
  const data = useApiFetch(`api/archived-tasks/?limit=${limit}&offset=${offset}`);

  if (data === null) {
    return <Loader />;
  }

  const { results: archivedTasks = [] } = data;

  return (
    <div>
      <p>ArchiveList</p>
      <ul>
        {archivedTasks.map((task) => {
          return <li key={task.id}>{task.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default ArchiveList;
