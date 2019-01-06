const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  admin: {
    type: Boolean
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
