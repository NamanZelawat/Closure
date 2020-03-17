function verifytoken(req, res, next) {
  if (req.cookies.token == undefined) {
    res.render("login", {
      layout: false,
      msg: "No cookie found please login again."
    });
  } else {
    next();
  }
}

module.exports = verifytoken;
