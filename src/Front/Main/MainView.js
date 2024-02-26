import React from 'react';
import { useRecoilState } from 'recoil';
import { IsLoggedIn } from '../../recoil/auth';
import { clearCookie, getCookie, removeCookie } from '../Cookie/cookie_manager';
import { useNavigate } from 'react-router-dom';

export default function MainView() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(IsLoggedIn);
  const navigate = useNavigate();
  return (
    <div>
      <div
        onClick={() => {
          getCookie('wmToken');
        }}
      >
        Main
      </div>

      <div
        onClick={() => {
          clearCookie();
          // navigate('/login', { replace: true });
          setIsLoggedIn(false);
        }}
      >
        Logout
      </div>
    </div>
  );
}
