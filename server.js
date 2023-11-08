// load packages
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

//  invoke express
const app = express()

//  url encodded body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//  import routes
const userRouter = require('./routes/user')

//  use routes
app.use('/user', userRouter)

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
