const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  if (req.cookies.token == undefined) {
    res.redirect("/signup");
  } else if (req.cookies.verified == "false") {
    res.redirect("/signup/login");
  } else {
    res.redirect("/chat");
  }
});

module.exports = router;
