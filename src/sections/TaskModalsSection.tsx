import EditTask from '../widgets/EditTask';
import Modal from '../widgets/Modal';
import NewTask from '../widgets/NewTask';
import React from 'react';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';

interface EditTaskRouteProps {
  onCancel?: () => void;
  postSave?: () => void;
}

const EditTaskRoute = (props: EditTaskRouteProps) => {
  const { id = '' } = useParams<{ id: string }>();
  return <EditTask taskID={id} {...props} />;
};

interface TaskModalSectionProps {
  refresh: () => void;
}

const TaskModalSection = ({ refresh }: TaskModalSectionProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onClose = () => navigate(pathname.replace(/\/(new|edit\/[^/]+)\/?$/, ''));

  return (
    <Routes>
      <Route
        path="new"
        element={
          <Modal open={true} onClose={onClose} showFooter={false} title="New task">
            <NewTask
              onCancel={onClose}
              postSave={() => {
                refresh();
                onClose();
              }}
            />
          </Modal>
        }
      />
      <Route
        path="edit/:id"
        element={
          <Modal open={true} onClose={onClose} showFooter={false} title="Edit task">
            <EditTaskRoute
              onCancel={onClose}
              postSave={() => {
                refresh();
                onClose();
              }}
            />
          </Modal>
        }
      />
    </Routes>
  );
};

export default TaskModalSection;
