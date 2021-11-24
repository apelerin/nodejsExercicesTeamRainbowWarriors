require('dotenv').config()
require('./db')
const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 4040;
const app = express()
const router = require('./routes/auth.routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(port, function() {
    console.log("Running on port " + port)
})

app.use('/', router)
