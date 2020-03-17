const dbase = require("./../../Schemas/userSchema");

function signin(email) {
  return new Promise((resolve, reject) => {
    console.log(email);
    dbase
      .find({
        email: `${email}`
      })
      .then(function(data) {
        if (data.length == 0) {
          console.log("no entry found");
          return resolve({
            success: true,
            data: data
          });
        } else {
          console.log("entry found while checking during signup");
          return reject({
            success: false,
            token: data[0]._id,
            email: data[0].email,
            verified: data[0].verified,
            username: data[0].username,
            password: data[0].password,
            err: 0
          });
        }
      })
      .catch(function(err) {
        console.log("entry not found");
        return reject({
          success: false,
          err: 1
        });
      });
  });
}

module.exports = signin;
