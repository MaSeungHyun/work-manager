const createHeader = () => {
  const header = {
    typ: 'JWT',
    alg: 'HS256',
  };

  const encodedHeader = new Buffer(JSON.stringify(header))
    .toString('base64')
    .replace('=', '');

  return encodedHeader;
};

const createPayload = (exp, username) => {
  const payload = {
    iss: 'ma.caron_g',
    exp,
    'http://localhost:3000/jwt_claims/admin': true,
    username: username,
  };

  const encodedPayload = new Buffer(JSON.stringify(payload))
    .toString('base64')
    .replace('=', '');

  return encodedPayload;
};

const createToken = (username) => {
  const date = new Date();
  // 1 hour
  const exp = date.getTime() + 3600000;
  const header = createHeader();
  const payload = createPayload(exp, username);
  const crypto = require('crypto');
  const signature = crypto
    .createHmac('sha256', 'secret')
    .update(header + '.' + payload)
    .digest('base64')
    .replace('=', '');

  return `${header}.${payload}.${signature}`;
};

module.exports = { createToken };
