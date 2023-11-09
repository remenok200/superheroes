const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ROLE_USER } = require('../../constants');

const userSchema = new Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) =>
        /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value),
    },
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: ROLE_USER,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
