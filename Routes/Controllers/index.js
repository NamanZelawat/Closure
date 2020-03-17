const express = require("express");
const router = express.Router();
const Signup = require("./Signup");
const Chat = require("./Chat");
const Verify = require("./Verify");

router.use("/", Verify);
router.use("/signup", Signup);
router.use("/chat", Chat);

module.exports = router;
