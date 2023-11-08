//  load moongose
const moongose = require('moongose')

//  create schema
const UserSchema = moongose.Schema({
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
  userType:{
    default: 'student',
  }
})

//export model
const User = moongose.model('User', UserSchema)
module.exports = {User}