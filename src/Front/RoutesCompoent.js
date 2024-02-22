import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { IsLoggedIn } from '../recoil/auth';
import AuthForm from './Auth/AuthForm';
import { UserSignUp } from './Auth/Components/UserSignUp';
import MainView from './Main/Main';

export default function RouterComponent() {
  const isLoggedIn = useRecoilValue(IsLoggedIn);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!isLoggedIn ? <Navigate to="/login" /> : <MainView />}
        />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<UserSignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
