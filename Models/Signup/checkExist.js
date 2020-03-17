const dbase = require("./../../Schemas/userSchema");

function signin(email) {
  return new Promise((resolve, reject) => {
    dbase
      .find({
        email: `${email}`
      })
      .then(function(data) {
        if (data.length == 0) {
          return resolve({
            success: true,
            data: data
          });
        } else {
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
        return reject({
          success: false,
          err: 1
        });
      });
  });
}

module.exports = signin;
