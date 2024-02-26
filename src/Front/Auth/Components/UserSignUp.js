import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../CSS/UserSign.module.css';

export const UserSignUp = () => {
  const navigate = useNavigate();

  const [regInfo, setRegInfo] = useState({
    regId: '',
    regPassword: '',
    regName: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setRegInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onPostUser = async (e) => {
    e.preventDefault();

    const date = new Date();

    const payload = {
      id: regInfo.regId,
      password: regInfo.regPassword,
      name: regInfo.regName,
      regDate: date.toLocaleString(),
    };

    const response = await axios.post('/auth/createUser', payload, {
      headers: {
        'Content-Type': `application/json`,
        // Accept: "application/json",
        // Authorization: "Bearer " + token,
        'Access-Control-Allow-Origin': `*`,
        'Access-Control-Allow-Credentials': 'true',
      },
    });

    if (response.data.regist) {
      alert('회원가입에 성공했습니다.');
      navigate('/');
    } else {
      alert('회원가입에 실패하였습니다.');
    }
  };

  const movToPrevPage = () => {
    navigate('/login', { replace: true });
  };

  return (
    <div className={styles.authForm}>
      <div className={styles.formBox}>
        <form onSubmit={onPostUser}>
          <div>
            <input
              className={styles.logInfo}
              name="regId"
              onChange={onChangeHandler}
              value={regInfo.regId}
              autoFocus
              placeholder="ID"
              autoComplete="off"
            />
          </div>
          <div>
            <input
              className={styles.logInfo}
              name="regPassword"
              type="password"
              onChange={onChangeHandler}
              value={regInfo.regPassword}
              placeholder="Password"
              autoComplete="off"
            />
          </div>

          {/* <div>
          <input
            className={styles.logInfo}
            name="regPassword"
            onChange={onChangeHandler}
            value={regInfo.regPassword}
            placeholder="Password"
            autoComplete="off"
          />
        </div> */}
          <div>
            <input
              className={styles.logInfo}
              name="regName"
              onChange={onChangeHandler}
              value={regInfo.regName}
              placeholder="Name"
              autoComplete="off"
            />
          </div>

          <div>
            <button className={styles.logButton} type="submit">
              create an account
            </button>
          </div>
        </form>
        <div>
          <button className={styles.logButton} onClick={movToPrevPage}>
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};
