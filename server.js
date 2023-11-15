// load packages
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const logger = require('morgan')
const cors = require('cors')

//  invoke express
const app = express()

app.use(cors())
app.use(logger('dev'))

//  url encodded body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//  import routes
const userRouter = require('./routes/user')
const questionRouter = require('./routes/question')
const answerRouter = require('./routes/answer')
const commentRouter = require('./routes/comment')

//  use routes
app.use('/user', userRouter)
app.use('/question', questionRouter)
app.use('/answer', answerRouter)
app.use('/comment', commentRouter)

//  listen to port
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log('server started, listen to port ' + PORT)
})

//  connect to mongoDB
mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to mongoDB successfully')
  })
  .catch((err) => {
    console.log('couldnt connect to mongoDB error: ' + err)
  })
