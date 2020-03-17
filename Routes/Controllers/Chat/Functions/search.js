const model1 = require("./../../../../Models/Chat/search");

function search(keyword) {
  return new Promise(function(resolve, reject) {
    model1(keyword)
      .then(function(data) {
        var users = [];
        data.data.forEach(function(ele) {
          users.push(ele.username);
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

module.exports = search;
