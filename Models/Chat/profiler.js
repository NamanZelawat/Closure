const dbase = require("./../../Schemas/userSchema");

function profiler(user) {
  console.log("profiler called");
  return new Promise((resolve, reject) => {
    dbase
      .find({
        username: user
      })
      .then(function(data) {
        console.log(data);
        return resolve({
          username: data[0].username,
          first: data[0].first,
          last: data[0].last,
          bio: data[0].bio,
          email: data[0].email
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  }).catch(function(err) {
    console.log(err);
  });
}

module.exports = profiler;
