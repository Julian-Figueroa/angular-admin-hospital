const moongose = require('mongoose');

const UserSchema = moongose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    required: true
  }
});

module.exports = moongose.model('user', UserSchema);
