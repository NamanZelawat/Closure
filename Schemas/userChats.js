const mongoose = require("mongoose");

const mquerySchema = new mongoose.Schema({
  users: {
    type: Array,
    required: [true, "users are required"]
  },
  chats: {
    type: Array,
    required: false
  }
});

var myquery = mongoose.model("chats", mquerySchema);

module.exports = myquery;
