const model1 = require("./../../../../Models/Signup/checkExist");
const model2 = require("./../../../../Models/Signup/signin");

function signin(body) {
  return new Promise((resolve, reject) => {
    console.log("inside signin");
    model1(body.email)
      .then(function(data) {
        if (data.success == true) {
          console.log("calling model");
          model2(body)
            .then(function(data) {
              return resolve({
                success: true,
                token: data.token,
                email: data.email,
                username: "eklavya"
              });
            })
            .catch(function(err) {
              return reject({
                success: false,
                exist: 0,
                err: err
              });
            });
        } else {
          return reject({
            success: false,
            exist: 1,
            err: "User already exists"
          });
        }
      })
      .catch(function(err) {
        return reject({
          success: false,
          err: err.err
        });
      });
  });
}

module.exports = signin;
