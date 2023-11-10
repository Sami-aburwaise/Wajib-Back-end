//  load packages
const express = require('express')
const middleware = require('../middleware/middleware')

//  invoke express router functionality
const router = express.Router()

//  controllers
const questionCtrl = require('../controllers/question')

//  routers
router.get(
  '/search',
  middleware.stripToken,
  middleware.verifyToken,
  questionCtrl.question_search_get
)

router.post(
  '/create',
  middleware.stripToken,
  middleware.verifyToken,
  questionCtrl.question_create_post
)

router.get(
  '/show/:id',
  middleware.stripToken,
  middleware.verifyToken,
  questionCtrl.question_show_get
)

router.post(
  '/update/:id',
  middleware.stripToken,
  middleware.verifyToken,
  questionCtrl.question_update_post
)

router.get(
  '/delete/:id',
  middleware.stripToken,
  middleware.verifyToken,
  questionCtrl.question_delete_get
)

//  expoert router to server
module.exports = router
