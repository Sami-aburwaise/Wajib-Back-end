//  load mongoose
const mongoose = require('mongoose')

//  create schema
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    maxlength: [20, 'username is too long'],
    minlength: [3, 'username is too short']
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Weak Password']
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  canAnswer: {
    type: Boolean,
    default: false
  }
})

//export model
const User = mongoose.model('User', userSchema)
module.exports = { User }
