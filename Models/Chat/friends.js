const dbase = require("./../../Schemas/userSchema");

function friends(token) {
  console.log("in friends");
  return new Promise((resolve, reject) => {
    dbase
      .find({
        _id: `${token}`
      })
      .then(function(data) {
        console.log(data);
        console.log("found user");
        console.log(data);
        var users = [];
        data[0].friends.forEach(function(ele) {
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

module.exports = friends;
