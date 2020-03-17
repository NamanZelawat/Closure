const dbase = require("./../../Schemas/userChats");

function addChat(info) {
  return new Promise((resolve, reject) => {
    dbase
      .findOneAndUpdate(
        {
          users: { $all: [info.name, info.username] }
        },
        {
          $push: {
            chats: { message: info.message, sender: info.name }
          }
        }
      )
      .then(function(data) {
        return resolve({
          success: true
        });
      })
      .catch(function(err) {
        return reject({
          success: false
        });
      });
  });
}

module.exports = addChat;
