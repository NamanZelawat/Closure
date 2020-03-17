const dbase = require("./../../Schemas/userSchema");

function username(data) {
  return new Promise((resolve, reject) => {
    dbase
      .findOneAndUpdate(
        {
          _id: `${data.token}`
        },
        {
          username: `${data.username}`
        }
      )
      .then(function(data) {
        return resolve({
          success: true
        });
      })
      .catch(function(data) {
        return reject({
          success: false
        });
      });
  });
}

module.exports = username;
