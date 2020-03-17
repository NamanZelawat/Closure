const dbase = require("./../../Schemas/userChats");

function addChat(info) {
  console.log("in add chat");
  return new Promise((resolve, reject) => {
    console.log(info);
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
        console.log(err);
        return reject({
          success: false
        });
      });
  });
}

module.exports = addChat;
