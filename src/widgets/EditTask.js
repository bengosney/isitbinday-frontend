import React from 'react';
import TaskForm from '../forms/TaskForm';
import { TaskSchema } from '../schemas/TaskSchema';

const EditTask = ({ task, postSave }) => <TaskForm details={task} postSave={postSave} />;

export default EditTask;
