require('dotenv').config()
require('./db')
const express = require('express')
const port = process.env.PORT || 4040;
const app = express()
const router = require('./routes/auth.routes')

app.listen(port, function() {
    console.log("Running on port " + port)
})

app.use('/', router)
