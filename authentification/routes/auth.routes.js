const router = require('express').Router()
const authController = require('../controller/auth.controller')
const security = require('../middlewares/security')

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
    .put(security.checkJwt, authController.updateUser)
router.route('/delete')
    .delete(security.checkJwt, authController.deleteUser)

module.exports = router
