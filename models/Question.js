//  load mongoose
const mongoose = require('mongoose')

//  create schema
const questionserSchema = mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  subject: {
    type: String,
    required: true,
    lowercase: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  }
})

//export model
const Question = mongoose.model('Question', questionserSchema)
module.exports = { Question }
