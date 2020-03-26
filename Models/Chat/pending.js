const dbase = require("./../../Schemas/userSchema");

function pending(token) {
  console.log(token);
  return new Promise((resolve, reject) => {
    console.log("in pending");
    dbase
      .find({
        _id: `${token}`
      })
      .then(function(data) {
        console.log(data)
        var users = [];
        data[0].pending.forEach(function(ele) {
          users.push(ele);
        });
        console.log("Success");
        return resolve({
          success: true,
          data: users
        });
      })
      .catch(function(data) {
        console.log(data);
        return reject({
          success: false
        });
      });
  });
}

module.exports = pending;
