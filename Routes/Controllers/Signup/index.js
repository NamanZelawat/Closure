const express = require("express");
const router = express.Router();
const middleware = require("./middleware/index");
const { signin } = require("./Functions");
const checkExist = require("./../../../Models/Signup/checkExist");
const otp = require("./../../../Models/Signup/otp");

router.get("/", function(req, res) {
  res.render("index", {
    layout: false
  });
});

router.get("/signin", function(req, res) {
  var msg;
  if (req.query.err == undefined) {
    msg = "No account found please signup";
  } else if (req.query.err == 1) {
    msg = "Technical error";
  }
  res.render("signin", {
    layout: false,
    msg: msg
  });
});

router.post("/signin", function(req, res) {
  if (
    req.body.email == "" ||
    req.body.password == "" ||
    req.body.confirmPassword == ""
  ) {
    res.render("signin", {
      layout: false,
      msg: "Field empty"
    });
  } else if (req.body.password != req.body.confirmPassword) {
    res.render("signin", {
      layout: false,
      msg: "Passowrd does not match"
    });
  } else {
    signin(req.body)
      .then(function(data) {
        if (data.success) {
          res.cookie("token", `${data.token}`);
          res.cookie("email", `${data.email}`);
          res.cookie("username", `${data.username}`);
          res.cookie("verified", false);
          res.redirect("login?new=1&old=0");
        } else {
          if (data.exist == 1) {
            res.redirect("login?new=0&old=1");
          } else {
            res.render("signin", {
              layout: false,
              msg: "Some error occured please try again"
            });
          }
        }
      })
      .catch(function(err) {
        res.redirect("login?new=0&old=1");
      });
  }
});

router.get("/login", middleware, function(req, res) {
  var msg;
  if (req.query.new == 1) {
    msg = "New account created";
  } else if (req.query.old == 1) {
    msg = "Already account exist please login";
  } else if (req.query.logout == 1) {
    res.clearCookie("token");
    res.clearCookie("email");
    res.clearCookie("username");
    res.clearCookie("verified");
    msg = "Please login again";
  } else {
    msg = "Please login again";
  }
  res.render("login", {
    layout: false,
    msg: msg
  });
});

router.post("/login", function(req, res) {
  if (req.cookies.token == undefined) {
    var info = {
      email: req.body.email,
      password: req.body.password
    };
    checkExist(req.body.email)
      .then(function(data) {
        res.redirect("signin");
      })
      .catch(function(data) {
        if (data.err) {
          res.redirect("signin?err=1");
        } else {
          if (data.password == req.body.password) {
            if (data.verified) {
              res.cookie("token", `${data.token}`);
              res.cookie("email", `${data.email}`);
              res.cookie("username", `${data.username}`);
              res.cookie("verified", true);

              res.redirect("../chat");
            } else {
              res.cookie("token", `${data.token}`);
              res.cookie("email", `${data.email}`);
              res.cookie("username", `${data.username}`);
              res.cookie("verified", false);

              res.redirect("otp");
            }
          } else {
            res.redirect("login");
          }
        }
      });
  } else if (req.cookies.verified == "false") {
    res.redirect("otp");
  } else if (req.body.email != req.cookies.email) {
    checkExist(req.body.email)
      .then(function(data) {
        res.redirect("signin");
      })
      .catch(function(data) {
        if (data.err) {
          res.redirect("signin?err=1");
        } else {
          if (data.verified) {
            res.cookie("token", `${data.token}`);
            if (data.verified) {
              res.cookie("token", `${data.token}`);
              res.cookie("email", `${data.email}`);
              res.cookie("username", `${data.username}`);
              res.cookie("verified", true);

              res.redirect("../chat");
            } else {
              res.cookie("token", `${data.token}`);
              res.cookie("email", `${data.email}`);
              res.cookie("username", `${data.username}`);
              res.cookie("verified", false);

              res.redirect("otp");
            }
            res.cookie("email", `${data.email}`);
            res.cookie("username", `${data.username}`);
            res.cookie("verified", true);

            res.redirect("../chat");
          } else {
            res.cookie("token", `${data.token}`);
            res.cookie("email", `${data.email}`);
            res.cookie("username", `${data.username}`);
            res.cookie("verified", false);

            res.redirect("otp");
          }
        }
      });
  } else {
    res.redirect("../chat");
  }
});

router.get("/otp", middleware, function(req, res) {
  if (req.cookies.verified == "true") {
    res.redirect("../chat");
  } else if (req.query.verification == 0) {
    var msg = "Incorrect otp";
    res.render("otp", {
      layout: false,
      msg: msg
    });
  } else {
    res.render("otp", {
      layout: false,
      msg: "Please try again"
    });
  }
});

router.post("/otp", middleware, function(req, res) {
  req.body.token = req.cookies.token;
  console.log("in otp");
  otp(req.body)
    .then(function(data) {
      if (data.success) {
        res.cookie("verified", true);
        res.redirect("../chat");
      } else {
        res.redirect("otp?verification=0");
      }
    })
    .catch(function(err) {
      res.redirect("otp?verification=0");
    });
});

router.get("/hookup", middleware, function(req, res) {});

module.exports = router;
