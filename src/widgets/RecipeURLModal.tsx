import { Form } from '../utils/Form';
import apiFetch from '../utils/apiFetch';
import Modal from './Modal';
import { Stack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface RecipeURLModalProps {
  onClose?: () => void;
}

const RecipeURLModal = ({ onClose = () => undefined }: RecipeURLModalProps) => {
  const navigate = useNavigate();

  const close = () => {
    onClose();
    navigate('/iibd/recipes');
  };

  return (
    <Modal title={'Add recipe from URL'} open={true} onClose={() => close()}>
      <Form
        initialValues={{ url: '' }}
        onSubmit={async ({ url }, { resetForm }) => {
          if (`${url}` !== '') {
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
