const check = require("./../../../../Models/Chat/usernameCheck");
const set = require("./../../../../Models/Chat/username");

function username(data) {
  return new Promise((resolve, reject) => {
    check(data.username)
      .then(function(d) {
        set(data)
          .then(function(dd) {
            return resolve({
              success: true
            });
          })
          .catch(function(dd) {
            return reject({
              success: false
            });
          });
      })
      .catch(function(d) {
        return reject({
          success: false
        });
      });
  });
}

module.exports = username;
