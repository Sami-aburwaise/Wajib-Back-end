//  import models
const { User } = require('../models/User')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')
//  API's
exports.user_signup_post = (req, res) => {
  let user = User(req.body)
  const salt = 10
  let hashedPassword = bcrypt.hashSync(req.body.password, salt)
  user.password = hashedPassword
  user
    .save()
    .then(() => {
      res.send({
        ok: true,
        msg: 'signed up successful'
      })
    })
    .catch((err) => {
      res.send({
        ok: false,
        msg: 'error, couldnt signup'
      })
    })
}

exports.user_login_post = async (req, res) => {
  let { username, password } = req.body
  await User.findOne({ username: username })
    .then(async (user) => {
      let passwordMatched = await bcrypt.compare(password, user.password)
      if (passwordMatched) {
        res.send({
          ok: true,
          msg: ''
        })
      } else {
        res.send({
          ok: false,
          msg: 'Incorrect password'
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.send({
        ok: false,
        msg: 'something went wrong'
      })
    })
}

exports.user_show_get = (req, res) => {
  User.findOne()
    .then((user) => {
      res.send({
        ok: true
      })
    })
    .catch((err) => {
      res.send({
        ok: true,
        msg: 'error, try again later'
      })
    })
}
