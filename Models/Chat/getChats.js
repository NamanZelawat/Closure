const dbase = require("./../../Schemas/userChats");

function getChats(info) {
  return new Promise((resolve, reject) => {
    console.log("function called");
    dbase
      .find({
        users: { $all: [info.name, info.username] }
      })
      .then(function(data) {
        console.log("Successful");
        var users = [];
        data[0].chats.forEach(function(ele) {
          users.push({
            message: ele.message,
            status: info.name != ele.sender,
            name: info.name,
            username: info.username
          });
        });
        return resolve({
          success: true,
          data: users
        });
      })
      .catch(function(err) {
        return reject({
          success: false
        });
      });
  });
}

module.exports = getChats;
