import React from 'react';
import TaskForm from '../forms/TaskForm';

const EditTask = ({ task, postSave }) => <TaskForm details={task} postSave={postSave} />;

export default EditTask;
