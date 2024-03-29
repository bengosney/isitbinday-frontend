import TaskForm from '../forms/TaskForm';
import { useApiFetch } from '../utils/apiFetch';
import Loader from './Loader';
import React from 'react';

const EditTask = ({ taskID, postSave }) => {
  const data = useApiFetch(`api/tasks/tasks/${taskID}`);

  if (data === null) {
    return <Loader />;
  }

  return (
    <>
      <TaskForm details={data} postSave={postSave} />
    </>
  );
};

export default EditTask;
