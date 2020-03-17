const dbase = require("./../../Schemas/userSchema");

function pending(token) {
  return new Promise((resolve, reject) => {
    dbase
      .find({
        _id: `${token}`
      })
      .then(function(data) {
        console.log("found user");
        console.log(data);
        var users = [];
        data[0].pending.forEach(function(ele) {
          users.push(ele);
        });
        console.log(users);
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

module.exports = pending;
