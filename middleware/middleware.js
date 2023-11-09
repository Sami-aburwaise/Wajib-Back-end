const jwt = require('jsonwebtoken')
require('dotenv').config()
const APP_SECRET = process.env.APP_SECRET

exports.checkPassword = (password, userPassword) => {}

exports.createToken = (payload) => {
  let token = jwt.sign(payload, APP_SECRET)
  return token
}

exports.verifyToken = (req, res, next) => {
  const { token } = res.locals
  try {
    let payload = jwt.verify(token, APP_SECRET)
    if (payload) {
      res.locals.payload = payload //  add the decoded payload to locals
      req.userId = payload.id
      return next()
    }
    res.send({
      status: 'login',
      msg: ''
    })
  } catch {
    res.status(403).send({
      status: 'error',
      msg: 'couldnt authorize'
    })
  }
}

exports.stripToken = (req, res, next) => {
  try {
    //  get token from auth header
    const token = req.headers['authorization'].split(' ')[1]
    if (token) {
      res.locals.token = token
      return next()
    }
    res.send({
      status: 'login',
      msg: ''
    })
  } catch {
    res.send({
      status: 'login',
      msg: ''
    })
  }
}
