const dbase = require("./../../Schemas/userSchema");

function otp(body) {
  return new Promise((resolve, reject) => {
    console.log("verifying otp");
    console.log(body);
    dbase
      .findOneAndUpdate(
        {
          $and: [{ _id: body.token }, { otp: body.otp }]
        },
        {
          verified: true
        }
      )
      .then(function(data) {
        if (data == null) {
          return reject({
            success: false
          });
        } else {
          console.log(data);
          console.log("verified");
          return resolve({
            success: true
          });
        }
      })
      .catch(function(err) {
        return reject({
          success: false
        });
      });
  });
}

module.exports = otp;
