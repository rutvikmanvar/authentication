const express = require('express')
const {addContact,getUserContacts} = require('../controllers/contact_controller')
const router = express.Router();

router.post('/add',addContact)
router.get('/list/:userId', getUserContacts);


module.exports = router;