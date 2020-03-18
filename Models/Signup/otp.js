const dbase = require("./../../Schemas/userSchema");

function otp(body) {
  return new Promise((resolve, reject) => {
    console.log("in otp");
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
          console.log("not done");
          return reject({
            success: false
          });
        } else {
          console.log("Done");
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
