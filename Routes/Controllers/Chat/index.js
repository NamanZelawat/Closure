const express = require("express");
const router = express.Router();
const middleware = require("./middleware/index");
const username = require("./Functions/username");
const friends = require("./Functions/friends");
const search = require("./Functions/search");
const friendRequest = require("./../../../Models/Chat/friendRequest");
const checkFriend = require("./../../../Models/Chat/checkFriend");
const pending = require("./../../../Models/Chat/pending");
const accept = require("./../../../Models/Chat/accept");
const createChat = require("./../../../Models/Chat/createChat");
const addChat = require("./../../../Models/Chat/addChat");
const getChats = require("./../../../Models/Chat/getChats");
const profiler = require("./../../../Models/Chat/profiler");

router.get("/", middleware, function(req, res) {
  if (req.cookies.username != "eklavya") {
    res.redirect("chat/view");
  } else {
    res.render("username", {
      layout: false
    });
  }
});

router.post("/", middleware, function(req, res) {
  var dat = {
    username: req.body.username,
    first: req.body.first,
    last: req.body.last,
    bio: req.body.bio,
    token: req.cookies.token
  };
  if (dat.username == "") {
    res.render("username", {
      layout: false,
      msg: "Empty field"
    });
  } else {
    username(dat)
      .then(function(data) {
        res.cookie("username", `${dat.username}`);

        res.redirect("chat/view");
      })
      .catch(function(data) {
        res.render("username", {
          layout: false,
          msg:
            "Please try again username already exists or some technical error"
        });
      });
  }
});

router.get("/view", middleware, function(req, res) {
  friends(req.cookies.token)
    .then(function(data) {
      res.render("view", {
        layout: false,
        friends: data.data
      });
    })
    .catch(function(data) {
      res.render("error", {
        layout: false
      });
    });
});

router.post("/view", middleware, function(req, res) {
  search(req.body.keyword)
    .then(function(data) {
      res.render("search", {
        layout: false,
        search: data.data
      });
    })
    .catch(function(data) {
      res.render("search", {
        layout: false,
        msg: "No user found"
      });
    });
});

router.get("/user", middleware, function(req, res) {
  var check = {
    name: req.cookies.username,
    username: req.query.username
  };
  checkFriend(check)
    .then(function(data) {
      if (check.username == check.name) {
        res.redirect("me");
      } else if (data.status == 0) {
        profiler(req.query.username)
          .then(function(data) {
            console.log(data);
            res.render("profile", {
              layout: false,
              name: data.username,
              first: data.first,
              last: data.last,
              bio: data.bio,
              email: data.email,
              btn:
                "<button type='button' class='profile-edit-btn'>Friends</button>"
            });
          })
          .catch(function(err) {
            console.log(err);
          });
      } else if (data.status == 1) {
        profiler(req.query.username)
          .then(function(data) {
            console.log(data);
            res.render("profile", {
              layout: false,
              name: data.username,
              first: data.first,
              last: data.last,
              bio: data.bio,
              email: data.email,
              btn:
                "<button type='button' class='profile-edit-btn'>Pending</button>"
            });
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        profiler(req.query.username)
          .then(function(data) {
            console.log(data);
            res.render("profile", {
              layout: false,
              name: data.username,
              first: data.first,
              last: data.last,
              bio: data.bio,
              email: data.email,
              btn:
                "<button type='submit' class='profile-edit-btn' >Add friend</button>"
            });
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    })
    .catch(function(data) {
      res.render("error", {
        layout: false
      });
    });
});

router.post("/user", middleware, function(req, res) {
  var pass = {
    name: req.cookies.username,
    username: req.body.username
  };
  friendRequest(pass)
    .then(function(data) {
      if (data.status == 0) {
        res.redirect(`user?username=${pass.username}`);
      } else {
        res.redirect(`request?username=${pass.username}&accepted=0`);
      }
    })
    .catch(function(data) {
      res.render("profile", {
        layout: false,
        error: "Friend request not sent, try sometime later"
      });
    });
});

router.get("/me", middleware, function(req, res) {
  profiler(req.cookies.username)
    .then(function(data) {
      console.log(data);
      res.render("profile", {
        layout: false,
        name: data.username,
        first: data.first,
        last: data.last,
        bio: data.bio,
        email: data.email
      });
    })
    .catch(function(err) {
      console.log(err);
    });
});

router.get("/pending", middleware, function(req, res) {
  console.log("in pending");
  pending(req.cookies.token)
    .then(function(data) {
      res.render("pending", {
        layout: false,
        pending: data.data
      });
    })
    .catch(function(data) {
      res.render("error", {
        layout: false,
        msg: "Some error in pending"
      });
    });
});

router.get("/request", middleware, function(req, res) {
  console.log(req.query);
  if (req.query.accepted == 0) {
    profiler(req.query.username)
      .then(function(data) {
        console.log(data);
        res.render("request", {
          layout: false,
          name: data.username,
          first: data.first,
          last: data.last,
          bio: data.bio,
          email: data.email,
          btn: "<button type='submit' class='profile-edit-btn' >Accept</button>"
        });
      })
      .catch(function(err) {
        console.log(err);
      });
    // res.render("request", {
    //   layout: false,
    //   name: req.query.username,
    //   bio: "Hey there I am using closure",
    //   btn: "<button type='submit' class='profile-edit-btn' >Accept</button>"
    // });
  } else {
    var check = {
      name: req.cookies.username,
      username: req.query.username
    };
    checkFriend(check)
      .then(function(data) {
        if (data.status == 0) {
          profiler(req.query.username)
            .then(function(data) {
              console.log(data);
              res.render("request", {
                layout: false,
                name: data.username,
                first: data.first,
                last: data.last,
                bio: data.bio,
                email: data.email,
                btn:
                  "<button type='button' class='profile-edit-btn' >Friends</button>"
              });
            })
            .catch(function(err) {
              console.log(err);
            });
        } else {
          res.redirect(`request?username=${check.username}&accepted=0`);
        }
      })
      .catch(function(err) {});
    // res.render("request", {
    //   layout: false,
    //   name: req.query.username,
    //   bio: "Hey there I am using closure",
    //   btn: "<button type='button' class='profile-edit-btn' >Friends</button>"
    // });
  }
});

router.post("/request", middleware, function(req, res) {
  console.log(req.body);
  var info = {
    name: req.cookies.username,
    username: req.body.username
  };
  createChat(info)
    .then(function(data) {
      accept(info)
        .then(function(data) {
          res.redirect(`request?username=${info.username}&accepted=1`);
        })
        .catch(function(data) {
          res.render("error", {
            layout: false,
            msg: "Some error in request"
          });
        });
    })
    .catch(function(err) {
      res.render("error", {
        layout: false,
        msg: "Some error in request"
      });
    });
});

router.get("/hookup", middleware, function(req, res) {
  var info = {
    name: req.cookies.username,
    username: req.query.username
  };
  console.log("inside get chats");
  getChats(info)
    .then(function(data) {
      res.render("hookup", {
        layout: false,
        chats: data.data,
        name: req.query.username
      });
    })
    .catch(function(err) {
      res.render("error", {
        layout: false,
        msg: "error in adding chat"
      });
    });
});

router.post("/hookup", middleware, function(req, res) {
  var info = {
    name: req.cookies.username,
    username: req.body.username,
    message: req.body.message
  };
  console.log("inside hookup");
  addChat(info)
    .then(function(data) {
      res.redirect(`hookup?username=${info.username}`);
    })
    .catch(function(err) {
      res.render("error", {
        layout: false,
        msg: "error in adding chat"
      });
    });
});

module.exports = router;
