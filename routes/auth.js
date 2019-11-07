const express = require("express");
const router = express.Router();
const authController = require("./controllers/auth.controller");

router.post("/facebook", authController.facebookLogin);

module.exports = router;
