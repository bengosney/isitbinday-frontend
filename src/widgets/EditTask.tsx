import TaskForm from '../forms/TaskForm';
import { useApiFetch } from '../utils/apiFetch';
import Loader from './Loader';
import React from 'react';

interface EditTaskProps {
  taskID: string | number;
  postSave?: (resetForm: () => void) => void;
  onCancel?: (() => void) | null;
}

const EditTask = ({ taskID, postSave, onCancel = null }: EditTaskProps) => {
  const data = useApiFetch(`api/tasks/tasks/${taskID}`);

  if (data === null) {
    return <Loader />;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const TaskFormAny = TaskForm as any;
  return (
    <>
      <TaskFormAny details={data} postSave={postSave} onCancel={onCancel} />
    </>
  );
};

export default EditTask;
