const express = require('express');
const router = express.Router();
const eventControllers = require("./controllers/event.controller");

router.post("/", eventControllers.createEvent);
router.get("/:user_id", eventControllers.getTotalMoney);
router.get("/:user_id/:recipient_id", eventControllers.getEvent);

module.exports = router;
