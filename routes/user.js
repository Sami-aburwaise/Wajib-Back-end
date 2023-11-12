//  load packages
const express = require('express')
const middleware = require('../middleware/middleware')

//  invoke express router functionality
const router = express.Router()

//  controllers
const userCtrl = require('../controllers/user')

//  routers
router.post('/signup', userCtrl.user_signup_post)
router.post('/login', userCtrl.user_login_post)
router.get(
  '/profile',
  middleware.stripToken,
  middleware.verifyToken,
  userCtrl.user_show_get
)
router.post(
  '/update',
  middleware.stripToken,
  middleware.verifyToken,
  userCtrl.user_update_post
)
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  userCtrl.checkSession
)

//  expoert router to server
module.exports = router
