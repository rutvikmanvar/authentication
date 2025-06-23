const express = require('express')
const {handleUser} = require('../controllers/user_controller')
const router = express.Router();

router.post('/',handleUser)

module.exports = router;