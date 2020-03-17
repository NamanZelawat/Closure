const dbase = require("./../../Schemas/userSchema");

function usernameCheck(name) {
  return new Promise((resolve, reject) => {
    dbase
      .find({
        username: `${name}`
      })
      .then(function(data) {
        if (data.length == 0) {
          return resolve({
            success: true
          });
        } else {
          return reject({
            success: false
          });
        }
      })
      .catch(function(data) {
        return reject({
          success: false
        });
      });
  });
}

module.exports = usernameCheck;
