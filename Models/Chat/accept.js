const dbase = require("./../../Schemas/userSchema");

function accept(info) {
  console.log("in accept");
  return new Promise((resolve, reject) => {
    dbase
      .findOneAndUpdate(
        {
          username: info.name
        },
        {
          $pull: {
            pending: info.username
          },
          $push: {
            friends: info.username
          }
        }
      )
      .then(function(data) {
        console.log(data);
        console.log("Done updating one acc");
        dbase
          .findOneAndUpdate(
            {
              username: info.username
            },
            {
              $push: {
                friends: info.name
              }
            }
          )
          .then(function(data) {
            return resolve({
              success: true
            });
          })
          .catch(function(data) {
            return reject({
              success: false
            });
          });
      })
      .catch(function(err) {
        console.log(err);
        return reject({
          success: false
        });
      });
  });
}

module.exports = accept;
