//  load mongoose
const mongoose = require('mongoose')

//  create schema
const questionSchema = mongoose.Schema(
  {
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
  },
  {
    timestamps: true
  }
)

//export model
const Question = mongoose.model('Question', questionSchema)
module.exports = { Question }
