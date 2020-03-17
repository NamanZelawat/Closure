const dbase = require("./../../Schemas/userSchema");

function search(keyword) {
  console.log("Inside model search");
  return new Promise((resolve, reject) => {
    dbase
      .find({
        username: {
          $regex: ".*" + keyword + ".*"
        }
      })
      .then(function(data) {
        console.log("field found");
        console.log(data);
        return resolve({
          success: true,
          data: data
        });
      })
      .catch(function(data) {
        return reject({
          success: false
        });
      });
  });
}

module.exports = search;
