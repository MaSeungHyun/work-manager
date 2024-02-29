import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../CSS/UserSign.module.css';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { IsLoggedIn, UserId, Username } from '../../../recoil/auth';
import { clearCookie, getCookie, setCookie } from '../../Cookie/cookie_manager';

export const UserSignIn = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(IsLoggedIn);
  const [usernId, setUserId] = useRecoilState(UserId);
  const [username, setUsername] = useRecoilState(Username);
  const [input, setInput] = useState({
    userId: '',
    userPw: '',
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onMoveRegist = () => {
    navigate('/register');
  };

  const executeLogin = async (e) => {
    e.preventDefault();

    if (input.userId && input.userPw) {
      const payload = {
        id: input.userId,
        password: input.userPw,
      };
      const response = await axios.post('/auth/login', payload, {
        headers: {
          'Content-Type': `application/json`,
          'Access-Control-Allow-Origin': `*`,
          'Access-Control-Allow-Credentials': 'true',
          // Authorization: `Bearer ${getCookie('accesss_token')}`,
        },
      });

      console.log(response);
      if (response?.data.success) {
        setIsLoggedIn(true);
        setUserId(input.userId);
        setUsername(response.data.name);
        console.log(response);
        console.log(response.headers);
        console.log(response.data.access_token);

        setCookie('access_token', `${response.data.access_token}`);

        // axios.defaults.headers.common[
        //   'Authorization'
        // ] = `Bearer ${response.data.access_token}`;
        // axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie(
        //   'access_token',
        // )}`;

        navigate('/', { replace: true });
      } else {
        alert(response.data.message);
      }
    } else {
      alert('회원 정보를 입력해주세요.');
    }
  };

  useEffect(() => {
    clearCookie();
    setIsLoggedIn(false);
  }, []);

  return (
    <div className={styles.authForm}>
      <div className={styles.formBox}>
        <form onSubmit={executeLogin}>
          <div>
            <input
              autoFocus
              className={styles.logInfo}
              name="userId"
              value={input.userId}
              placeholder="ID"
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <input
              className={styles.logInfo}
              name="userPw"
              type="password"
              value={input.userPw}
              placeholder="Password"
              onChange={onChangeHandler}
            />
          </div>

          <div>
            <button className={styles.logButton} type="submit">
              Login
            </button>
          </div>
        </form>

        <div className={styles.logOpt}>
          <div className={styles.check_remember}>
            {/* <input id="rememberInfo" type="checkbox"></input>
          <label htmlFor="rememberInfo">remeber</label> */}
          </div>
          <div className={styles.registButton}>
            <div onClick={onMoveRegist}>create an account</div>
          </div>
        </div>
      </div>
    </div>
  );
};
