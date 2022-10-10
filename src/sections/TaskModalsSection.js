import EditTask from '../widgets/EditTask';
import Modal from '../widgets/Modal';
import NewTask from '../widgets/NewTask';
import React from 'react';
import { useRouteMatch, Route, Switch, useHistory, useParams } from 'react-router-dom';

const EditTaskRoute = ({ ...props }) => {
  let { id } = useParams();

  return <EditTask taskID={id} {...props} />;
};

const TaskModalSection = ({ refresh }) => {
  const { path } = useRouteMatch();

  const getUrl = (slug) => {
    return `${path}/${slug}`.replace('//', '/');
  };

  const editUrl = getUrl('edit/:id');
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
