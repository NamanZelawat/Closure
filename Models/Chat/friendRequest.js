const dbase = require("./../../Schemas/userSchema");

function friendRequest(pass) {
  console.log("sending a friend request");
  console.log(pass);
  return new Promise((resolve, reject) => {
    dbase
      .find({
        $and: [{ username: pass.name }, { pending: { $in: pass.username } }]
      })
      .then(function(data) {
        console.log(data);
        if (data.length == 0) {
          dbase
            .findOneAndUpdate(
              {
                username: `${pass.username}`
              },
              {
                $push: { pending: pass.name }
              }
            )
            .then(function(data) {
              console.log("updated data");
              console.log(data);
              return resolve({
                success: true,
                status: 0
              });
            })
            .catch(function(data) {
              return reject({
                success: false
              });
            });
        } else {
          return resolve({
            success: true,
            status: 1
          });
        }
      })
      .catch(function(err) {
        return reject({
          success: false
        });
      });
  });
}

module.exports = friendRequest;
