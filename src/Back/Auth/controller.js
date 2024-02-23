const { User } = require('../models/userModel');
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
      // ctx.status = 200;
      ctx.body = { success: true, message: 'Login successful' };
    } else {
      console.log('Failed Login');
      // ctx.status = 401; // Unauthorized
      ctx.body = { success: false, message: 'Invalid credentials' };
    }
  } catch (e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = 'Internal Server Error';
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
  const { id, password, regDate } = ctx.request.body;

  const dbName = 'Auth';
  const collection = 'users';

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = {
    id,
    password: hash,
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
