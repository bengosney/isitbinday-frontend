import { TaskSchema } from '../schemas/TaskSchema';
import { Form } from '../utils/Form';
import apiFetch from '../utils/apiFetch';
import { Button, Flex, Grid, Spacer } from '@chakra-ui/react';
import React, { useState } from 'react';

interface TaskFormValues {
  id: number;
  title: string;
  due_date: Date | string | null;
  effort: number;
  blocked_by: string;
  repeats: string;
  [key: string]: unknown;
}

interface TaskFormProps {
  details?: Record<string, unknown>;
  postSave?: ((resetForm: () => void) => void) | null;
  onCancel?: (() => void) | null;
}

const TaskForm = ({ details, postSave = null, onCancel = null }: TaskFormProps) => {
  const [apiLoading, setApiLoading] = useState(false);

  return (
    <Form<TaskFormValues>
      initialValues={TaskSchema.cast(details, { stripUnknown: true }) as TaskFormValues}
      validationSchema={TaskSchema}
      loading={apiLoading}
      onSubmit={async (values, { resetForm: _resetForm }) => {
        setApiLoading(true);
        const { due_date } = values;
        if (typeof due_date == 'object' && due_date !== null) {
          const d = due_date as Date;
          const year = `${d.getFullYear()}`;
          const month = `${d.getMonth() + 1}`.padStart(2, '0');
          const date = `${d.getDate()}`.padStart(2, '0');
          values.due_date = [year, month, date].join('-');
        }
        if (values.due_date === '') {
          values.due_date = null;
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
      <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr' }} gap={3}>
        <Form.DateField name="due_date" label="Due date" />
        <Form.Input name="repeats" label="Repeat" />
      </Grid>
      <div style={{ display: 'none' }}>
        <Form.Input name="effort" />
        <Form.Input name="blocked_by" />
      </div>
      <Flex gap={2} paddingTop={2}>
        <Spacer />
        {onCancel !== null && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Form.Button colorPalette="brand" type={'submit'}>
          Save task
        </Form.Button>
      </Flex>
    </Form>
  );
};

export default TaskForm;
