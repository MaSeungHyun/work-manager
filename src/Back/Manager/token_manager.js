const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.TOKEN_SECRET;

const header = {
  alg: 'HS256',
  typ: 'JWT',
};
const createToken = (obj, type) => {
  return jwt.sign({ ...header, ...obj }, secret, {
    expiresIn: type === 'refresh' ? '14d' : '1d',
    issuer: 'ma.caron_g',
  });
};

// const verifyToken = async () => {};
// const TOKEN_EXPIRED = -3;
// const TOKEN_INVALED = -2;
// const createHeader = () => {
//   const header = {
//     typ: 'JWT',
//     alg: 'HS256',
//   };

//   const encodedHeader = new Buffer(JSON.stringify(header))
//     .toString('base64')
//     .replace('=', '');

//   return encodedHeader;
// };

// const createPayload = (exp, username) => {
//   const payload = {
//     iss: 'ma.caron_g',
//     exp,
//     'http://localhost:3000/jwt_claims/admin': true,
//     username: username,
//   };

//   const encodedPayload = new Buffer(JSON.stringify(payload))
//     .toString('base64')
//     .replace('=', '');

//   return encodedPayload;
// };

// const createToken = (username) => {
//   const date = new Date();
//   // 1 hour
//   // const exp = date.getTime() + 3600000;
//   // 5 sec
//   const exp = date.getTime() + 5000;
//   const header = createHeader();
//   const payload = createPayload(exp, username);

//   const signature = crypto
//     .createHmac('sha256', secret)
//     .update(header + '.' + payload)
//     .digest('base64')
//     .replace('=', '');

//   return `${header}.${payload}.${signature}`;
// };

module.exports = { createToken };
