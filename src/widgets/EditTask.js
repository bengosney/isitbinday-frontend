import React from 'react';
import TaskForm from '../forms/TaskForm';
import { TaskSchema } from '../schemas/TaskSchema';

const EditTask = ({ details, postSave }) => <TaskForm details={details} postSave={postSave} />;

export default EditTask;
