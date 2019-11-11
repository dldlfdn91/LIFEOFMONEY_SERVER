const express = require("express");
const router = express.Router();
const authControllers = require("./controllers/auth.controller");

router.post("/facebook", authControllers.facebookLogin);

module.exports = router;
