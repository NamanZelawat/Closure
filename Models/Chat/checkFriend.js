const dbase = require("./../../Schemas/userSchema");

function checkFriend(check) {
  console.log("inside check friend");
  return new Promise((resolve, reject) => {
    dbase
      .find({
        $and: [{ username: check.name }, { friends: check.username }]
      })
      .then(function(data) {
        console.log(data);
        console.log("in friend");
        if (data.length == 1) {
          return resolve({
            success: true,
            status: 0
          });
        } else {
          console.log("not in friend going for pend");
          dbase
            .find({
              $and: [{ username: check.username }, { pending: check.name }]
            })
            .then(function(data) {
              console.log(data);
              console.log("in pend");
              if (data.length == 1) {
                return resolve({
                  success: true,
                  status: 1
                });
              } else {
                console.log("in none");
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
