import EditTask from '../widgets/EditTask';
import Modal from '../widgets/Modal';
import NewTask from '../widgets/NewTask';
import React from 'react';
import { useRouteMatch, Route, Switch, useHistory, useParams } from 'react-router-dom';

interface EditTaskRouteProps {
  onCancel?: () => void;
  postSave?: () => void;
}

const EditTaskRoute = (props: EditTaskRouteProps) => {
  const { id } = useParams<{ id: string }>();
  return <EditTask taskID={id} {...props} />;
};

interface TaskModalSectionProps {
  refresh: () => void;
}

const TaskModalSection = ({ refresh }: TaskModalSectionProps) => {
  const { path } = useRouteMatch();

  const getUrl = (slug: string) => {
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
          <Modal open={true} onClose={onClose} showFooter={false} title="New task">
            <NewTask
              onCancel={onClose}
              postSave={() => {
                refresh();
                onClose();
              }}
            />
          </Modal>
        </Route>
        <Route path={editUrl}>
          <Modal open={true} onClose={onClose} showFooter={false} title="Edit task">
            <EditTaskRoute
              onCancel={onClose}
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
