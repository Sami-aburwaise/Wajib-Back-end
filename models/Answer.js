//  load mongoose
const mongoose = require('mongoose')

//  create schema
const answerSchema = mongoose.Schema({
  answer: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'not approved'
  },
  image: {
    type: String,
    default: ''
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

//export model
const Answer = mongoose.model('Answer', answerSchema)
module.exports = { Answer }
