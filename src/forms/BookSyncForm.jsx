import { BookSyncSchema } from '../schemas/BookSyncSchema';
import { Form } from '../utils/Form';
import apiFetch from '../utils/apiFetch';
import React, { useState } from 'react';

const BookSyncForm = ({ details, postSave = null }) => {
  const [apiLoading, setApiLoading] = useState(false);

  return (
    <Form
      initialValues={BookSyncSchema.cast(details, { stripUnknown: true })}
      validationSchema={BookSyncSchema}
      loading={apiLoading}
      onSubmit={async (values, { resetForm: _resetForm }) => {
        setApiLoading(true);

        await apiFetch(`api/books/sync/`, values);

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
      <Form.Input name="server" />
      <Form.Input name="database" />
      <Form.Input name="username" autoComplete="off" />
      <Form.Input name="password" type="password" autoComplete="off" />
      <Form.Button type={'submit'}>Save</Form.Button>
    </Form>
  );
};

export default BookSyncForm;
