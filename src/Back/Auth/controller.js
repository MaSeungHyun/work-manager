const { User, Token } = require('../models/models');
const {
  registUser,
  getUser,
  registLoginUser,
} = require('../Manager/user_manager');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createToken } = require('../Manager/token_manager');
const { getKorISODate } = require('../Manager/date_manager');
require('dotenv').config();
const secret = process.env.TOKEN_SECRET;
//
// get User Info
//

exports.login = async (ctx) => {
  const { id, password } = ctx.request.body;
  const dbName = 'Auth';
  const collection = 'tokens';

  try {
    const user = await getUser('Auth', 'users', id);

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      console.log('Success Login');
      // ctx.status = 200;
      // const accesss_token = createToken(user.name);
      const payload = { id: user.id, name: user.name };

      const access_token = createToken(payload, 'access');
      const refresh_token = createToken(payload, 'refresh');

      const data = new Token({
        id: user.id,
        name: user.name,
        refresh_token,
        timestamps: getKorISODate(),
      });
      registLoginUser(dbName, collection, data);

      ctx.cookies.set('refresh_token', refresh_token, {
        httpOnly: true,
        // secure: true,
      });

      ctx.body = {
        success: true,
        message: 'Login successful',
        access_token,
      };
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

exports.getUser = async (ctx) => {
  const { id } = ctx.request.body;

  try {
    const user = await getUser('Auth', 'users', id);

    // const isMatch = await bcrypt.compare(password, user.password);

    if (user) {
      // ctx.status = 200;
      // const accesss_token = createToken(user.name);

      ctx.body = {
        success: true,
        message: 'find successful',
        name: user.name,
      };
    } else {
      // ctx.status = 401; // Unauthorized
      ctx.body = {
        success: false,
        message: 'Invalid credentials',
      };
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

  const user = new User({
    id,
    password: hash,
    name,
    regDate,
  });

  if (id && password && regDate && name) {
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

exports.silentRefresh = async (ctx) => {
  const { id } = ctx.request.body;

  const user = await getUser('Auth', 'users', id);
  // get AccessToken from ctx.headers

  const authHeader = ctx.request.headers['authorization'];

  // seperate 'Bearer'
  const token = authHeader.split(' ')[1];
  // const token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.GTYwnVaZFwtUiPnd327iDFvSuFesXAlzd5R6NrKXtiU';
  if (!token) {
    ctx.status = 401;
    ctx.body = 'Access token not provided';
    return;
  } else {
    try {
      jwt.verify(token, secret, (err, user) => {
        if (err) {
          ctx.status = 403;
          ctx.body = 'Access token is not valid';
        } else {
          ctx.body = user; // 유저 정보를 반환
        }
      });
    } catch (e) {
      console.log('token is not valid');
    }
  }
};
