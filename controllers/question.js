//  import models
const { Question } = require('../models/Question')
const { Comment } = require('../models/Comment')

//  API's

//  create
exports.question_create_post = async (req, res) => {
  let question = await Question(req.body)
  question.user = req.userId
  question
    .save()
    .then(() => {
      res.send({
        status: 'ok',
        msg: 'question posted'
      })
    })
    .catch((err) => {
      console.log(err)
      res.send({
        status: 'error',
        msg: 'couldnt post question'
      })
    })
}
//  index
exports.question_index_get = (req, res) => {}

//  show
exports.question_show_get = (req, res) => {
  Question.findById(req.params.id)
    .populate('user')
    .populate({ path: 'answer', populate: { path: 'user' } })
    .then(async (question) => {
      let comments = await Comment.find({ question: req.params.id }).populate(
        'user'
      )
      res.send({ ...question, comments })
    })
    .catch((err) => {
      console.log(err)
      res.send({
        status: 'error',
        msg: 'couldnt get question'
      })
    })
}

//  update
exports.question_update_post = async (req, res) => {
  let question = await Question.findById(req.params.id)
  if (question.user == req.userId) {
    question
      .updateOne(req.body)
      .then(() => {
        res.send({
          status: 'ok',
          msg: 'question updated'
        })
      })
      .catch((err) => {
        console.log(err)
        res.send({
          status: 'error',
          msg: 'couldnt update question'
        })
      })
  } else {
    res.send({
      status: 'error',
      msg: 'you are unauthrized to do that'
    })
  }
}

//  delete
exports.question_delete_get = async (req, res) => {
  let question = await Question.findById(req.params.id)
  if (question.user == req.userId) {
    question
      .deleteOne(req.body)
      .then(() => {
        res.send({
          status: 'ok',
          msg: 'question deleted'
        })
      })
      .catch((err) => {
        console.log(err)
        res.send({
          status: 'error',
          msg: 'couldnt delete question'
        })
      })
  } else {
    res.send({
      status: 'error',
      msg: 'you are unauthrized to do that'
    })
  }
}
