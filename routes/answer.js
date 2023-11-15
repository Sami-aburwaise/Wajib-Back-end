//  load packages
const express = require('express')

const middleware = require('../middleware/middleware')

//  invoke express router functionality
const router = express.Router()

//  controllers
const answerCtrl = require('../controllers/answer')

//  routers
router.post(
  '/post/:id',
  middleware.stripToken,
  middleware.verifyToken,
  answerCtrl.answer_create_post
)

router.post(
  '/update/:id',
  middleware.stripToken,
  middleware.verifyToken,
  answerCtrl.answer_update_post
)

router.get(
  '/delete/:id',
  middleware.stripToken,
  middleware.verifyToken,
  answerCtrl.answer_delete_get
)

router.get(
  '/report/:id',
  middleware.stripToken,
  middleware.verifyToken,
  answerCtrl.answer_report_post
)

//  expoert router to server
module.exports = router
