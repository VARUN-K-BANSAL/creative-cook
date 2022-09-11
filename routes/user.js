const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const userController = require('../controllers/user')

router.get('/login', userController.showLoginPage)
router.get('/register', userController.showRegisterPage)
router.post('/login', userController.checkCreds)
router.post('/register', userController.addData)
router.get('/logout', auth, userController.logout)

module.exports = router;