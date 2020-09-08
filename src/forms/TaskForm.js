import React from 'react';
import { TaskSchema } from '../schemas/TaskSchema';
import { Form } from '../utils/Form';
import { Formik } from 'formik';
import apiFetch from '../utils/apiFetch';

const TaskForm = ({ details, postSave = null }) => {
  return (
    <Formik
      initialValues={details}
      validationSchema={TaskSchema}
      onSubmit={async (values) => {
        apiFetch('api/tasks/', values).then(() => {
          if (postSave !== null) {
            postSave();
          }
        });
      }}
    >
      {(props) => {
        const { dirty, isSubmitting, isValidating } = props;
        return (
          <React.Fragment>
            <Form>
              <Form.Input name="title" />
              <Form.Input name="due_date" />
              <Form.Input name="effort" />
              <Form.Input name="blocked_by" />
              <Form.Button type={'submit'} disabled={!dirty || isSubmitting || isValidating}>
                Save
              </Form.Button>
            </Form>
          </React.Fragment>
        );
      }}
    </Formik>
  );
};

export default TaskForm;
