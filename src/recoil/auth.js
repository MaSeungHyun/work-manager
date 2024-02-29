import { atom } from 'recoil';

export const IsLoggedIn = atom({
  key: 'isLoggedIn',
  default: false,
});

export const UserId = atom({
  key: 'userId',
  default: null,
});
export const Username = atom({
  key: 'username',
  default: null,
});
