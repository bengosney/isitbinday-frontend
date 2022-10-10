import TaskForm from '../forms/TaskForm';
import { TaskSchema } from '../schemas/TaskSchema';
import React from 'react';

const NewTask = ({ postSave }) => <TaskForm details={TaskSchema.cast({})} postSave={postSave} />;

export default NewTask;
