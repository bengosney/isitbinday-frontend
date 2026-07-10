import TaskForm from '../forms/TaskForm';
import { TaskSchema } from '../schemas/TaskSchema';
import React from 'react';

const NewTask = ({ postSave, onCancel = null }) => (
  <TaskForm details={TaskSchema.cast({})} postSave={postSave} onCancel={onCancel} />
);

export default NewTask;
