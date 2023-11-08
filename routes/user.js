//  load packages
const express = require('express')

//  invoke express router functionality
const router = express.Router()

//  controllers
const userCtrl = require('../controllers/user')

//  routers
router.post('/signup', userCtrl.user_signup_post)
router.post('/login', userCtrl.user_login_post)
router.post('/edit', userCtrl.user_signup_post)

//  expoert router to server
module.exports = router
