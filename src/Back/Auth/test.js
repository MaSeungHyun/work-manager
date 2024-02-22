const bcrypt = require('bcrypt');

const password = '1111';

const encryption = (target) => {
  const salt = bcrypt.genSaltSync(10);

  const hash = bcrypt.hashSync(target, salt);

  console.log(salt);
  console.log(hash);
};

encryption(password);

const correctPw = '1111';
const inCorrectPw = '1112';
const hash = '$2b$10$OTjAIB8Oq.p7TNM8ViNaK.fvN7eYh8YaV4gqeD3WlMZgmjgohfPDa';

const comparePw = (target, hash) => {
  bcrypt.compare(target, hash).then((res) => {
    if (res) console.log('Success LogIn');
    else console.log(target, 'is not correct');
    return res;
  });
};

comparePw(correctPw, hash);
comparePw(inCorrectPw, hash);
