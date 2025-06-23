const express = require('express')
const {addContact,getUserContacts} = require('../controllers/contact_controller')
const router = express.Router();

router.post('/add',addContact)
router.get('/list/:userEmail', getUserContacts);


module.exports = router;