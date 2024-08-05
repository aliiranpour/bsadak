import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from 'views/auth/logIn/logIn';
import Home from 'views/home/home';

const AuthLayout = () => {
  return (
    <Routes>
      <Route path="/auth/Login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AuthLayout;
