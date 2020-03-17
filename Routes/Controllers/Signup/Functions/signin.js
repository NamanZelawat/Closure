const model1 = require("./../../../../Models/Signup/checkExist");
const model2 = require("./../../../../Models/Signup/signin");

function signin(body) {
  console.log("inside signin");
  return new Promise((resolve, reject) => {
    console.log("Checking existence");
    model1(body.email)
      .then(function(data) {
        if (data.success == true) {
          console.log("Going to create a new entry");
          console.log(body);
          model2(body)
            .then(function(data) {
              console.log("signin data");
              console.log(data);
              return resolve({
                success: true,
                token: data.token,
                email: data.email,
                username: "eklavya"
              });
            })
            .catch(function(err) {
              console.log(err);
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
