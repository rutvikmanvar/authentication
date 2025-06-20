const express = require('express')
const {handleLogin} = require('../controllers/login_controller')
const {handleSignup} = require('../controllers/signup_controller')
const router = express.Router();

router.post('/login',handleLogin)
router.post('/signup',handleSignup)

module.exports = router;