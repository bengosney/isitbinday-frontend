import React, { useState, useContext } from 'react';
import { Button, Grid, Header, Segment } from 'semantic-ui-react';
import { Form } from '../utils/Form';
import { authContext } from '../Auth';
import * as Yup from 'yup';
import { Formik } from 'formik';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Required').ensure(),
  password: Yup.string().required('Required').ensure(),
});

const LoginForm = () => {
  const { login } = useContext(authContext);

  return (
    <Grid textAlign="center" style={{ height: '80vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account
        </Header>
        <Form
          initialValues={loginSchema.cast({})}
          validationSchema={loginSchema}
          onSubmit={async (values) => {
            const { username, password } = values;
            login(username, password);
          }}
        >
          <Segment>
            <Form.Input name={'username'} />
            <Form.Input name={'password'} type="password" />
            <Form.Button type="submit">Login</Form.Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};
export default LoginForm;
