const model1 = require("./../../../../Models/Chat/search");

function search(keyword) {
  console.log("Inside search");
  return new Promise(function(resolve, reject) {
    model1(keyword)
      .then(function(data) {
        console.log("Making users");
        var users = [];
        data.data.forEach(function(ele) {
          users.push(ele.username);
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

module.exports = search;
