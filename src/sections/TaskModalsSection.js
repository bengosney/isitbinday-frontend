import React, { useState } from 'react';
import { useRouteMatch, Route, Switch, useHistory, useParams } from 'react-router-dom';
import TaskList from '../widgets/TaskList';
import NewTask from '../widgets/NewTask';
import EditTask from '../widgets/EditTask';
import FAB from '../widgets/FAB';
import { MdAdd } from 'react-icons/md';
import { Stack } from '@chakra-ui/core';
import Modal from '../widgets/Modal';

const EditTaskRoute = ({ ...props }) => {
  let { id } = useParams();

  return <EditTask taskID={id} {...props} />;
};

const TaskModalSection = ({ refresh }) => {
  const { path } = useRouteMatch();

  console.log(path);
  const getUrl = (slug) => {
    return `${path}/${slug}`.replace('//', '/');
  };

  const editUrl = getUrl(':id');
  const newUrl = getUrl('new');
  const onClose = () => history.push(path);

  const history = useHistory();

  return (
    <React.Fragment>
      <Switch>
        <Route path={newUrl}>
          <Modal isOpen={true} onClose={onClose} showFooter={false} title="New Task">
            <NewTask
              postSave={() => {
                refresh();
                onClose();
              }}
            />
          </Modal>
        </Route>
        <Route path={editUrl}>
          <Modal isOpen={true} onClose={onClose} showFooter={false} title="Edit Task">
            <EditTaskRoute
              postSave={() => {
                refresh();
                onClose();
              }}
            />
          </Modal>
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default TaskModalSection;
