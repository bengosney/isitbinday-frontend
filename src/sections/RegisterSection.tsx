import RegisterActivate from '../widgets/RegisterActivate';
import RegisterDetails from '../widgets/RegisterDetails';
import RegisterForm from '../widgets/RegisterForm';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const RegisterSection = () => {
  return (
    <Routes>
      <Route index element={<RegisterForm />} />
      <Route path="activate/:uid/:token" element={<RegisterActivate />} />
      <Route path=":email" element={<RegisterDetails />} />
    </Routes>
  );
};

export default RegisterSection;
