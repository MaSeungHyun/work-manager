import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { IsLoggedIn } from '../../recoil/auth';
import { UserSignIn } from '../Auth/Components/UserSingIn';
import AuthForm from '../Auth/AuthForm';
import { UserSignUp } from '../Auth/Components/UserSignUp';

export default function MainView() {
  const isLoggedIn = useRecoilValue(IsLoggedIn);
  return (
    <div>
      <div>Main</div>
    </div>
  );
}
