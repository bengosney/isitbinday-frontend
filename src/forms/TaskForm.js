import React, { useState } from 'react';
import { TaskSchema } from '../schemas/TaskSchema';
import { Form } from '../utils/Form';
import apiFetch from '../utils/apiFetch';

const TaskForm = ({ details, postSave = null }) => {
  const [apiLoading, setApiLoading] = useState(false);

  console.log('task', details);

  return (
    <Form
      initialValues={TaskSchema.cast(details, { stripUnknown: true })}
      validationSchema={TaskSchema}
      loading={apiLoading}
      onSubmit={async (values, { resetForm }) => {
        setApiLoading(true);

        console.log('onSubmit', values);

        if (values.id > 0) {
          await apiFetch(`api/tasks/${values.id}/`, values);
        } else {
          await apiFetch('api/tasks/', values);
        }

        if (postSave !== null) {
          postSave();
        }

        resetForm();
        setApiLoading(false);
      }}
    >
      <Form.Input name="title" />
      <Form.DateField name="due_date" />
      <Form.Input name="effort" />
      <Form.Input name="blocked_by" />
      <Form.Button type={'submit'}>Save</Form.Button>
    </Form>
  );
};

export default TaskForm;
