import { Form } from '../utils/Form';
import apiFetch from '../utils/apiFetch';
import Modal from './Modal';
import { Stack } from '@chakra-ui/react';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

const RecipeURLModal = () => {
  const { path } = useRouteMatch();
  const history = useHistory();

  const close = () => {
    history.push(path.substring(0, path.lastIndexOf('/')));
  };

  return (
    <Modal title={'Add recipe from URL'} isOpen={true} onClose={() => close()}>
      <Form
        onSubmit={async ({ url }, { resetForm }) => {
          if (`${url}` != '') {
            await apiFetch('api/recipes/recipe/from_url/', { url: url });
            close();
          } else {
            resetForm();
          }
        }}
      >
        {() => (
          <Stack>
            <Form.Input name={'url'} />
            <Form.Button type="submit">Add</Form.Button>
          </Stack>
        )}
      </Form>
    </Modal>
  );
};

export default RecipeURLModal;
