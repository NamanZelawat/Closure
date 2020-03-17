const dbase = require("./../../Schemas/userSchema");
const email = require("./email");

function signin(body) {
  return new Promise((resolve, reject) => {
    console.log(body);
    var otp = Math.floor(1000 + Math.random() * 9000);
    dbase
      .create({
        email: `${body.email}`,
        password: `${body.password}`,
        otp: `${otp}`
      })
      .then(function(data) {
        console.log(data);
        console.log("new entry created");
        email(body.email, otp).then(function(d) {
          if (d.success) {
            return resolve({
              success: true,
              token: data._id,
              email: data.email
            });
          } else {
            return reject({
              success: false,
              err: "Mail not sent"
            });
          }
        });
      })
      .catch(function(err) {
        console.log("error creating new user");
        return reject({
          success: false,
          err: err
        });
      });
  });
}

module.exports = signin;
