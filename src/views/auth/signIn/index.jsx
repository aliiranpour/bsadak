import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from 'views/home/home';
import Login from '../logIn/logIn';

const AuthLayout = () => {
  return (
    <Routes>
      <Route path="/auth/Login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AuthLayout;
