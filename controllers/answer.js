//  import models
const { Question } = require('../models/Question')
const { Answer } = require('../models/Answer')
const { Comment } = require('../models/Comment')
//  object id
const ObjectId = require('mongoose').Types.ObjectId
//  API's

//  create
exports.answer_create_post = async (req, res) => {
  let answer = await Answer(req.body)
  answer.user = req.userId
  answer
    .save()
    .then((answer) => {
      Question.findByIdAndUpdate(req.params.id, { answer: answer })
        .then((question) => {
          question.answer = answer
          res.send({
            status: 'ok',
            msg: 'answer posted',
            question: question
          })
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log(err)
      res.send({
        status: 'error',
        msg: 'couldnt post answer'
      })
    })
}

//  update
exports.answer_update_post = async (req, res) => {
  let answer = await Answer.findById(req.params.id)
  if (answer.user == req.userId) {
    answer
      .updateOne(req.body)
      .then(() => {
        res.send({
          status: 'ok',
          msg: 'answer updated',
          answer: answer
        })
      })
      .catch((err) => {
        console.log(err)
        res.send({
          status: 'error',
          msg: 'couldnt update answer'
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
exports.answer_delete_get = (req, res) => {
  Answer.findById(req.params.id)
    .then((answer) => {
      console.log(answer)
      if (answer.user == req.userId) {
        answer
          .deleteOne()
          .then(() => {
            Question.findOneAndUpdate(
              { answer: new ObjectId(answer._id) },
              { answer: null }
            )
              .then(() => {
                res.send({
                  status: 'ok',
                  msg: 'answer deleted'
                })
              })
              .catch((err) => {
                console.log(err)
                res.send({
                  status: 'error',
                  msg: 'question not found'
                })
              })
          })
          .catch((err) => {
            console.log(err)
            res.send({
              status: 'error',
              msg: 'couldnt delete answer'
            })
          })
      } else {
        res.send({
          status: 'error',
          msg: 'you are unauthrized to do that'
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.send({
        status: 'error',
        msg: 'couldnt find answer'
      })
    })
}

//  report
exports.answer_report_post = async (req, res) => {
  let answer = await Answer.findById(req.params.id)
  answer
    .updateOne({ status: 'reported' })
    .then((answer) => {
      res.send({
        status: 'ok',
        msg: 'answer updated',
        answer: answer
      })
    })
    .catch((err) => {
      console.log(err)
      res.send({
        status: 'error',
        msg: 'couldnt report answer'
      })
    })
}
