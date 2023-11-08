//  load mongoose
const mongoose = require('mongoose')

//  create schema
const commentSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }
})

//export model
const Comment = mongoose.model('Comment', commentSchema)
module.exports = { Comment }
