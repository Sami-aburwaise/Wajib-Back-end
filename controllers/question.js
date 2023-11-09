//  import models
const { Question } = require('../models/Question')

//  API's

//  create
exports.question_create_post = async (req, res) => {
  let question = await Question(req.body)
  question.user = req.userId
  question
    .save()
    .then(() => {
      res.send({
        statues: 'ok',
        msg: 'question posted'
      })
    })
    .catch((err) => {
      console.log(err)
      res.send({
        statues: 'error',
        msg: 'couldnt post question'
      })
    })
}
//  index
exports.question_index_get = (req, res) => {}

//  show
exports.question_show_get = (req, res) => {}

//  update
exports.question_update_post = async (req, res) => {
  let question = await Question.findById(req.params.id)
  if (question.user == req.userId) {
    question
      .updateOne(req.body)
      .then(() => {
        res.send({
          statues: 'ok',
          msg: 'question updated'
        })
      })
      .catch((err) => {
        console.log(err)
        res.send({
          statues: 'error',
          msg: 'couldnt update question'
        })
      })
  } else {
    res.send({
      statues: 'error',
      msg: 'you are unauthrized to do that'
    })
  }
}

//  delete
exports.question_delete_get = (req, res) => {}
