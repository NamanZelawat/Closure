const dbase = require("./../../Schemas/userSchema");

function search(keyword) {
  return new Promise((resolve, reject) => {
    dbase
      .find({
        username: {
          $regex: ".*" + keyword + ".*"
        }
      })
      .then(function(data) {
        return resolve({
          success: true,
          data: data
        });
      })
      .catch(function(data) {
        return reject({
          success: false
        });
      });
  });
}

module.exports = search;
