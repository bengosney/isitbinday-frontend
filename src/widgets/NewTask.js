import React from 'react';
import TaskForm from '../forms/TaskForm';
import { TaskSchema } from '../schemas/TaskSchema';

const NewTask = ({ postSave }) => <TaskForm details={TaskSchema.cast({})} postSave={postSave} />;

export default NewTask;
