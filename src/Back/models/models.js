const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  id: String,
  password: String,
  name: String,
  regDate: String,
});

const TokenSchema = new Schema({
  id: String,
  name: String,
  refresh_token: String,
  timestamps: String,
});

const User = mongoose.model('user', UserSchema);
const Token = mongoose.model('token', TokenSchema);

module.exports = { User, Token };
