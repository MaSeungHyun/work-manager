const { User } = require('../models/userModel');
const { createToken } = require('./createToken');
const { registUser, getUser } = require('./func_auth');
const bcrypt = require('bcrypt');

//
// get User Info
//
exports.getUser = async (ctx) => {
  const { id, password } = ctx.request.body;

  try {
    const user = await getUser('Auth', 'users', id);

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      console.log('Success Login');
      console.log(user);
      // ctx.status = 200;
      const token = createToken(user.name);
      ctx.body = { success: true, message: 'Login successful', token };
    } else {
      console.log('Failed Login');
      // ctx.status = 401; // Unauthorized
      ctx.body = { success: false, message: 'Invalid credentials' };
    }
  } catch (e) {
    console.log(e);
    ctx.body = { success: false, message: '회원정보가 올바르지 않습니다.' };
  }
};

//
// Get members that fit your condition
//

exports.searchUsers = async (ctx) => {
  let users;

  try {
    users = await User?.find().sort({ id: -1 }).limit(3).exec();
  } catch (e) {
    return ctx.throw(500, e);
  }
  ctx.body = 'Show User List';
};

exports.createUser = async (ctx) => {
  const { id, password, name, regDate } = ctx.request.body;

  const dbName = 'Auth';
  const collection = 'users';

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = {
    id,
    password: hash,
    name,
    regDate,
  };

  if (id && password && regDate) {
    console.log('DATA IS EXISTING.');
    const result = await registUser(dbName, collection, user);

    if (result) {
      ctx.body = { regist: true };
      console.log('Success Insert User');
    } else {
      ctx.body = { regist: false };
      console.log('already exists User');
    }
  } else {
    console.log('DATA IS NOT EXISTING.');
  }
};

exports.deleteUser = (ctx) => {
  ctx.body = 'Deleted User';
};

exports.replaceUser = (ctx) => {
  ctx.body = 'Replaced User';
};

exports.updateUser = (ctx) => {
  ctx.body = 'Updated User Info';
};
