const model1 = require("./../../../../Models/Chat/friends");

function friends(token) {
  return new Promise(function(resolve, reject) {
    model1(token)
      .then(function(data) {
        return resolve({
          success: true,
          data: data.data
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
