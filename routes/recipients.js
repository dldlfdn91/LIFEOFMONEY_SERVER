const express = require('express');
const router = express.Router();
const recipientControllers = require('./controllers/recipients.controller');

router.post('/', recipientControllers.createRecipient);
router.get('/:user_id', recipientControllers.getRecipientLists);

module.exports = router;
