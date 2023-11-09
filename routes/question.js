//  load packages
const express = require('express')
const middleware = require('../middleware/middleware')

//  invoke express router functionality
const router = express.Router()

//  controllers
const questionCtrl = require('../controllers/question')

//  routers
router.post(
  '/create',
  middleware.stripToken,
  middleware.verifyToken,
  questionCtrl.question_create_post
)
router.post(
  '/update/:id',
  middleware.stripToken,
  middleware.verifyToken,
  questionCtrl.question_update_post
)

//  expoert router to server
module.exports = router
