import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { IsLoggedIn, UserId, Username } from '../../recoil/auth';
import { clearCookie, getCookie, removeCookie } from '../Cookie/cookie_manager';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import axios from 'axios';

export default function MainView() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(IsLoggedIn);
  const [userId, setUserId] = useRecoilState(UserId);
  const [username, setUsername] = useRecoilState(Username);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate('/login', { replace: true });
  //   } else {
  //     axios
  //       .post('/auth/silentRefresh', { id: userId })
  //       .then((res) => {
  //         console.log(res);
  //         setUsername(res.data.name);
  //       })
  //       .then((res) => {});
  //   }

  //   return setUsername(null);
  // }, []);

  return (
    <div>
      <div
        style={{
          height: '30px',
          background: 'tomato',
          padding: '5px',
          justifyItems: 'center',
          alignItems: 'ceneter',
          color: 'white',
        }}
        onClick={(e) => {
          e.stopPropagation();
          getCookie('access_token');
          // getCookie('refresh_token');

          // verifyToken(getCookie('refresh_token'));
        }}
      >
        Welcome, {username} ({userId})
      </div>

      <div
        style={{
          height: '30px',
          background: 'skyblue',
          padding: '5px',
          justifyItems: 'center',
          alignItems: 'ceneter',
          color: 'white',
        }}
        onClick={(e) => {
          e.stopPropagation();
          navigate('/workmanager');
        }}
      >
        Go to Work List
      </div>
      <div
        style={{
          height: '30px',
          background: 'lightgreen',
          padding: '5px',
          justifyItems: 'center',
          alignItems: 'ceneter',
          color: 'white',
        }}
        onClick={(e) => {
          e.stopPropagation();
          removeCookie('access_token');
        }}
      >
        removeCookie
      </div>
      <div
        style={{
          height: '30px',
          background: 'yellow',
          padding: '5px',
          justifyItems: 'center',
          alignItems: 'ceneter',
          color: 'white',
        }}
        onClick={(e) => {
          e.stopPropagation();
          clearCookie();
          navigate('/login', { replace: true });
          setIsLoggedIn(false);
        }}
      >
        Logout
      </div>
    </div>
  );
}
