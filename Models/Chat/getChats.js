const dbase = require("./../../Schemas/userChats");

function getChats(info) {
  console.log("in get chat");
  return new Promise((resolve, reject) => {
    console.log(info);
    dbase
      .find({
        users: { $all: [info.name, info.username] }
      })
      .then(function(data) {
        console.log(data);
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
        console.log(err);
        return reject({
          success: false
        });
      });
  });
}

module.exports = getChats;
