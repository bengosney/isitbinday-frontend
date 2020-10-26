import React, { useState } from 'react';
import { useRouteMatch, Route, Switch, useHistory } from 'react-router-dom';
import TaskList from '../widgets/TaskList';
import NewTask from '../widgets/NewTask';
import EditTask from '../widgets/EditTask';
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
  const newUrl = getUrl('new');
  //const { isOpen, onOpen, onClose } = useDisclosure();
  const onClose = () => history.push(path);

  const history = useHistory();

  return (
    <React.Fragment>
      <Switch>
        <Route path={listUrl}>
          <Stack my={6}>
            <TaskList refreshKey={refresh} />
            <FAB onClick={() => history.push(newUrl)}>
              <MdAdd />
            </FAB>
          </Stack>
          <Route path={newUrl}>
            <Modal isOpen={true} onClose={onClose} showFooter={false} title="New Task">
              <NewTask
                postSave={() => {
                  setRefresh(Math.random());
                  onClose();
                }}
              />
            </Modal>
          </Route>
          <Route path={editUrl}>
            <Modal isOpen={true} onClose={onClose} showFooter={false} title="Edit Task">
              <EditTask
                postSave={() => {
                  setRefresh(Math.random());
                  onClose();
                }}
                task={{}}
              />
            </Modal>
          </Route>
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default TaskSection;
