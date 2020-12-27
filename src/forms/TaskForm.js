import React, { useState } from 'react';
import { TaskSchema } from '../schemas/TaskSchema';
import { Form } from '../utils/Form';
import apiFetch from '../utils/apiFetch';

const TaskForm = ({ details, postSave = null }) => {
  const [apiLoading, setApiLoading] = useState(false);

  return (
    <Form
      initialValues={TaskSchema.cast(details, { stripUnknown: true })}
      validationSchema={TaskSchema}
      loading={apiLoading}
      onSubmit={async (values, { resetForm: _resetForm }) => {
        setApiLoading(true);
        const { due_date } = values;
        if (typeof due_date == 'object' && due_date !== null) {
          const year = `${due_date.getFullYear()}`;
          const month = `${due_date.getMonth() + 1}`.padStart('0');
          const date = `${due_date.getDate()}`.padStart('0');
          values.due_date = [year, month, date].join('-');
        }

        if (values.id > 0) {
          await apiFetch(`api/tasks/tasks/${values.id}/`, values);
        } else {
          await apiFetch('api/tasks/tasks/', values);
        }

        const resetForm = () => {
          _resetForm();
          setApiLoading(false);
        };

        if (postSave !== null) {
          postSave(resetForm);
        } else {
          resetForm();
        }
      }}
    >
      <Form.Input name="title" />
      <Form.DateField name="due_date" />
      <Form.Input name="repeats" />
      <Form.Input name="effort" />
      <Form.Input name="blocked_by" />
      <Form.Button type={'submit'}>Save</Form.Button>
    </Form>
  );
};

export default TaskForm;
