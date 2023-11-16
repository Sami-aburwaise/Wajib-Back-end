//  import models
const { Question } = require('../models/Question')
const { Comment } = require('../models/Comment')

//  API's

//  create
exports.question_create_post = async (req, res) => {
  const recivedSubject = await req.body.subject
  const recivedQuestion = await req.body.question
  const imageName = await req.file.filename
  let question = await Question({
    subject: recivedSubject,
    question: recivedQuestion,
    image: imageName
  })
  question.user = req.userId
  question
    .save()
    .then(() => {
      res.send({
        status: 'ok',
        msg: 'question posted',
        question: question
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
//  search
exports.question_search_get = (req, res) => {
  Question.find({
    question: { $regex: req.query.search_query, $options: 'i' }
  })
    .populate('user', '-password -email')
    .then((question) => {
      res.send(question)
    })
    .catch((err) => {
      console.log(err)
    })
}

//  show
exports.question_show_get = (req, res) => {
  Question.findById(req.params.id)
    .populate('user', 'username')
    .populate({
      path: 'answer',
      populate: { path: 'user', select: 'username' }
    })

    .then(async (question) => {
      let comments = await Comment.find({ question: req.params.id }).populate(
        'user',
        'username'
      )

      comments = comments.reverse()

      res.send({ question, comments })
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
      .deleteOne()
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
