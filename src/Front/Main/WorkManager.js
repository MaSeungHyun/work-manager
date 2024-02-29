import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IsLoggedIn, UserId, Username } from '../../recoil/auth';
import { useRecoilState } from 'recoil';
import axios from 'axios';

export default function WorkManager() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(IsLoggedIn);
  const [userId, setUserId] = useRecoilState(UserId);
  const [username, setUsername] = useRecoilState(Username);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    } else {
      axios
        .post('/auth/silentRefresh', { id: userId })
        .then((res) => {
          console.log(res);
          setUsername(res.data.name);
        })
        .then((res) => {});
    }

    return setUsername(null);
  }, []);
  return (
    <div>
      <div
        style={{
          height: '30px',
          background: 'skyblue',
          padding: '5px',
          justifyItems: 'center',
          alignItems: 'ceneter',
          color: 'white',
        }}
        onClick={() => {
          navigate('/');
        }}
      >
        Back
      </div>
    </div>
  );
}
