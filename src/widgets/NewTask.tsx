import TaskForm from '../forms/TaskForm';
import { TaskSchema } from '../schemas/TaskSchema';
import React from 'react';

interface NewTaskProps {
  postSave?: (resetForm: () => void) => void;
  onCancel?: (() => void) | null;
}

const NewTask = ({ postSave, onCancel = null }: NewTaskProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const TaskFormAny = TaskForm as any;
  return <TaskFormAny details={TaskSchema.cast({})} postSave={postSave} onCancel={onCancel} />;
};

export default NewTask;
