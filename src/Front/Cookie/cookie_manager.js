import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name) => {
  axios.defaults.headers.common['Authorization'] = '';
  return cookies.remove(name);
};

export const clearCookie = () => {
  const ck = cookies.getAll();
  const targets = Object.keys(ck);

  targets.map((target) => {
    cookies.remove(target);
    axios.defaults.headers.common['Authorization'] = '';
  });

  return cookies.getAll();
};
