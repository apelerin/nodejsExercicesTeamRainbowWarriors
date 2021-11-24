const router = require('express').Router()
const authController = require('../controller/auth.controller')

router.get('/', function(req, res) {
    res.json({
        status: 'API works',
        message: 'Welcome to my API'
    })
})

router.route('/register')
    .post(authController.addUser)
router.route('/login')
    .post(authController.login)
router.route('/update')
    .put(authController.updateUser)
router.route('/delete')
    .delete(authController.deleteUser)

module.exports = router
