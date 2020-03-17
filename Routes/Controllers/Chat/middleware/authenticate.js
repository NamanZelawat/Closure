function authenticate(req, res, next) {
  console.log("in middleware");
  console.log(req.cookies);
  if (req.cookies.token == undefined || req.cookies.verified == "false") {
    res.render("login", {
      layout: false,
      msg:
        "Please login again as your account may not be verified or cookie may be missing."
    });
  } else {
    next();
  }
}

module.exports = authenticate;
