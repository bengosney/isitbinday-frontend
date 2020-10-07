import React, { useState } from 'react';
import { TaskSchema } from '../schemas/TaskSchema';
import { Form } from '../utils/Form';
import apiFetch from '../utils/apiFetch';

const TaskForm = ({ details, postSave = null }) => {
  const [apiLoading, setApiLoading] = useState(false);

  return (
    <Form
      initialValues={TaskSchema.cast(details)}
      validationSchema={TaskSchema}
      loading={apiLoading}
      onSubmit={async (values, { resetForm }) => {
        setApiLoading(true);

        await apiFetch('api/tasks/', values);

        if (postSave !== null) {
          postSave();
        }

        resetForm();
        setApiLoading(false);
      }}
    >
      <Form.Input name="title" />
      <Form.Input name="due_date" />
      <Form.Input name="effort" />
      <Form.Input name="blocked_by" />
      <Form.Button type={'submit'}>Save</Form.Button>
    </Form>
  );
};

export default TaskForm;
