import React, { useState } from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import TaskList from '../widgets/TaskList';
import NewTask from '../widgets/NewTask';
import FAB from '../widgets/FAB';
import { MdAdd } from 'react-icons/md';
import { Stack, useDisclosure } from '@chakra-ui/core';
import Modal from '../widgets/Modal';

const TaskSection = () => {
  const { path } = useRouteMatch();
  const [refresh, setRefresh] = useState(0);

  const getUrl = (slug) => {
    return `${path}/${slug}`.replace('//', '/');
  };

  const listUrl = getUrl('');
  const editUrl = getUrl(':id');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <React.Fragment>
      <Switch>
        <Route exact path={listUrl}>
          <Stack my={6}>
            <TaskList refreshKey={refresh} />
            <FAB onClick={onOpen}>
              <MdAdd />
            </FAB>
            <Modal isOpen={isOpen} onOpen={onOpen} onClose={onClose} showFooter={false} title="New Task">
              <NewTask
                postSave={() => {
                  setRefresh(Math.random());
                  onClose();
                }}
              />
            </Modal>
          </Stack>
        </Route>
        <Route path={editUrl}>
          <h1>Edit</h1>
          <NewTask />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default TaskSection;
