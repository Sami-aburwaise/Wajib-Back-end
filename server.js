// load packages
express = require('express')
require('dotenv').config()

//  invoke express
app = express()

//  import routes


//  use routes

//  listen to port
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log('server started, listen to port ' + PORT)
})

//  connect to mongoDB
