const header = {
  typ: 'JWT',
  alg: 'HS256',
};

const encodedHeader = new Buffer(JSON.stringify(header))
  .toString('base64')
  .replace('=', '');

// console.log(encodedHeader);

const payload = {
  iss: 'ma.caron_g',
  exp: '1488970000000',
  'http://localhost:3000/jwt_claims/admin': true,
  userId: '123456789',
  username: 'macarong',
};

const encodedPayload = new Buffer(JSON.stringify(payload))
  .toString('base64')
  .replace('=', '');

// console.log(encodedPayload);

const crypto = require('crypto');
const signature = crypto
  .createHmac('sha256', 'secret')
  .update(encodedHeader + '.' + encodedPayload)
  .digest('base64')
  .replace('=', '');

console.log(signature);
