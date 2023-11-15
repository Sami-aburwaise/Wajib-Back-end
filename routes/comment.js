//  load packages
const express = require('express')

const middleware = require('../middleware/middleware')

//  invoke express router functionality
const router = express.Router()

//  controllers
const commentCtrl = require('../controllers/comment')

//  routers
router.post(
  '/post/:id',
  middleware.stripToken,
  middleware.verifyToken,
  commentCtrl.comment_create_post
)

router.get(
  '/delete/:id',
  middleware.stripToken,
  middleware.verifyToken,
  commentCtrl.comment_delete_get
)

//  expoert router to server
module.exports = router
