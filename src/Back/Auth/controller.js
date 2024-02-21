const { User } = require('../models/userModel');
const { registUser, getUser } = require('./func_auth');
const bcrypt = require('bcrypt');

//
// get User Info
//

exports.getUser = async (ctx) => {
  const { id } = ctx.params;

  const user = await getUser('Auth', 'users', id);

  try {
    ctx.body = `Hello, ${user.id}`;
  } catch (e) {
    ctx.status = 400;
    // ctx.body = "User not Found";
    return ctx.throw(500, e);
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

  console.log(id);
  console.log(password);
  console.log(regDate);
  console.log(hash);
  const user = {
    id,
    hash,
    regDate,
  };

  if (id && password && regDate) {
    console.log('DATA IS EXISTING.');
    const result = await registUser(dbName, collection, user);

    if (result) {
      console.log('Success Insert User');
    } else {
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
