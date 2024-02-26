import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name) => {
  console.log(cookies.get(name));
  return cookies.get(name);
};

export const removeCookie = (name) => {
  console.log('cookie is deleted');
  return cookies.remove(name);
};

export const clearCookie = () => {
  const ck = cookies.getAll();
  const allTarget = Object.keys(ck);

  allTarget.map((target) => {
    cookies.remove(target);
  });

  console.log(cookies.getAll());
  return cookies.getAll();
};
