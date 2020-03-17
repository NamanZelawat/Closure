const dbase = require("./../../Schemas/userSchema");

function otp(body) {
  return new Promise((resolve, reject) => {
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
