const router = require('express').Router()
const authController = require('../controller/auth.controller')

router.get('/', function(req, res) {
    res.json({
        status: 'API works',
        message: 'Welcome to my API'
    })
})

router.route('/user')
    .post(authController)

module.exports = router