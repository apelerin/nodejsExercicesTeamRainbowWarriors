const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/user_auth_node')
    .catch(error => console.log(error))
