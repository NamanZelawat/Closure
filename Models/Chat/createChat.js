const dbase = require("./../../Schemas/userChats");

function createChat(info) {
  console.log("in create chat");
  return new Promise((resolve, reject) => {
    console.log(info);
    dbase
      .create({
        users: [info.name, info.username]
      })
      .then(function(data) {
        console.log(data);
        console.log("made chat user");
        return resolve({
          success: true
        });
      })
      .catch(function(data) {
        console.log(err);
        return reject({
          success: false
        });
      });
  });
}

module.exports = createChat;
