import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../CSS/UserSign.module.css';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { IsLoggedIn } from '../../../recoil/auth';
export const UserSignIn = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(IsLoggedIn);
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

  const executeLogin = async () => {
    const payload = {
      id: input.userId,
      password: input.userPw,
    };
    const response = await axios.post('/auth/getUser', payload, {
      headers: {
        'Content-Type': `application/json`,
        'Access-Control-Allow-Origin': `*`,
        'Access-Control-Allow-Credentials': 'true',
      },
    });

    if (response?.data.success) {
      console.log(response.data.message);
      setIsLoggedIn(true);
      navigate('/');
    } else {
      console.log(response.data.message);
    }
  };

  return (
    <div className={styles.authForm}>
      <div className={styles.formBox}>
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
          <button className={styles.logButton} onClick={executeLogin}>
            Login
          </button>
        </div>

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
