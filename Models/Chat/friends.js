const dbase = require("./../../Schemas/userSchema");

function friends(token) {
  return new Promise((resolve, reject) => {
    dbase
      .find({
        _id: `${token}`
      })
      .then(function(data) {
        var users = [];
        data[0].friends.forEach(function(ele) {
          users.push(ele);
        });
        return resolve({
          success: true,
          data: users
        });
      })
      .catch(function(data) {
        return reject({
          success: false
        });
      });
  });
}

module.exports = friends;
