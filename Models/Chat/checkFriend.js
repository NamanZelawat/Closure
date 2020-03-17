const dbase = require("./../../Schemas/userSchema");

function checkFriend(check) {
  return new Promise((resolve, reject) => {
    dbase
      .find({
        $and: [{ username: check.name }, { friends: check.username }]
      })
      .then(function(data) {
        if (data.length == 1) {
          return resolve({
            success: true,
            status: 0
          });
        } else {
          dbase
            .find({
              $and: [{ username: check.username }, { pending: check.name }]
            })
            .then(function(data) {
              if (data.length == 1) {
                return resolve({
                  success: true,
                  status: 1
                });
              } else {
                return resolve({
                  success: true,
                  status: 2
                });
              }
            })
            .catch(function(data) {
              return reject({
                success: false
              });
            });
        }
      })
      .catch(function(data) {
        return reject({
          success: false
        });
      });
  });
}

module.exports = checkFriend;
