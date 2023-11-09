//  import models
const { User } = require('../models/User')
const bcrypt = require('bcrypt')
const middleware = require('../middleware/middleware')
require('dotenv').config()
const SALT = parseInt(process.env.SALT)

//  API's
exports.user_signup_post = (req, res) => {
  let user = User(req.body)
  let hashedPassword = bcrypt.hashSync(req.body.password, SALT)
  user.password = hashedPassword
  user
    .save()
    .then(() => {
      res.send({
        statues: 'ok',
        msg: 'signed up successful'
      })
    })
    .catch((err) => {
      res.send({
        statues: 'error',
        msg: 'error, couldnt signup'
      })
    })
}

exports.user_login_post = async (req, res) => {
  /*
  get user from database
  compare passwords, if ok
  create a token, and send it
  */
  let { username, password } = req.body
  await User.findOne({ username: username })
    .then(async (user) => {
      let passwordMatched = await bcrypt.compare(password, user.password)
      if (passwordMatched) {
        let payload = {
          id: user.id,
          username: user.username
        }
        let token = middleware.createToken(payload)
        res.send({ user: payload, token })
      } else {
        res.send({
          statues: 'error',
          msg: 'Incorrect password'
        })
      }
    })
    .catch((err) => {
      res.send({
        statues: 'error',
        msg: 'something went wrong'
      })
    })
}

exports.user_show_get = (req, res) => {
  User.findById(req.userId)
    .then((user) => {
      res.send({
        id: user.id,
        username: user.username,
        email: user.email
      })
    })
    .catch((err) => {
      res.send({
        statues: 'error',
        msg: 'error, try again later'
      })
    })
}

exports.user_update_post = async (req, res) => {
  let { username, email, password, newPassword } = req.body
  await User.findById(req.userId)
    .then(async (user) => {
      let passwordMatched = await bcrypt.compare(password, user.password)
      if (passwordMatched) {
        let newInfo = {}
        if (newPassword != '') {
          let hashedPassword = bcrypt.hashSync(newPassword, SALT)
          newInfo = {
            username: username,
            email: email,
            password: hashedPassword
          }
        } else {
          newInfo = {
            username: username,
            email: email
          }
        }
        user
          .updateOne(newInfo)
          .then(() => {
            res.send({
              statues: 'ok',
              msg: 'account updated'
            })
          })
          .catch((err) => {
            res.send({
              statues: 'error',
              msg: 'update failed'
            })
          })
      } else {
        res.send({
          statues: 'error',
          msg: 'Incorrect password'
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.send({
        statues: 'error',
        msg: 'Unauthorized'
      })
    })
}
