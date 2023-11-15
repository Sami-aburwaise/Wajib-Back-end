//  import models
const { Question } = require('../models/Question')
const { Answer } = require('../models/Answer')
const { Comment } = require('../models/Comment')
//  object id
const ObjectId = require('mongoose').Types.ObjectId
//  API's

//  create
exports.comment_create_post = async (req, res) => {
  let comment = await Comment(req.body)
  comment.user = req.userId
  comment.question = req.params.id
  comment
    .save()
    .then((comment) => {
      res.send({
        status: 'ok',
        msg: 'comment added',
        comment: comment
      })
    })
    .catch((err) => {
      console.log(err)
      res.send({
        status: 'error',
        msg: 'error adding comment'
      })
    })
}

//  delete
exports.comment_delete_get = async (req, res) => {
  let comment = await Comment.findById(req.params.id)
  if (comment.user == req.userId) {
    comment
      .deleteOne()
      .then(() => {
        res.send({
          status: 'ok',
          msg: 'comment deleted'
        })
      })
      .catch((err) => {
        console.log(err)
        res.send({
          status: 'error',
          msg: 'couldnt delete comment'
        })
      })
  } else {
    res.send({
      status: 'error',
      msg: 'you are unauthrized to do that'
    })
  }
}
