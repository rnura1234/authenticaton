const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new Schema({
  name: {
    type: String,
    require: [true, 'user must have name'],
  },
  email: {
    type: String,
    require: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide a valid email'],
  },
  password: {
    type: String,
    require: [true, 'user must have password'],
  },
  confirmPassword: {
    type: String,
    require: [true, 'Please confirm you password'],
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: 'Password are not the same',
    },
  },
  role: {
    type: String,
    enum: ['admin', 'student'],
    default: 'student',
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 8);
  this.confirmPassword = undefined;
  next();
});
const User = model('User', userSchema);

module.exports = User;
