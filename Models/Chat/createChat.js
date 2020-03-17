const dbase = require("./../../Schemas/userChats");

function createChat(info) {
  return new Promise((resolve, reject) => {
    dbase
      .create({
        users: [info.name, info.username]
      })
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
  });
}

module.exports = createChat;
