const express = require('express');
const router = express.Router();
const eventControllers = require("./controllers/event.controller");

router.post("/", function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
