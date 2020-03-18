const mongoose = require("mongoose");

const mquerySchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"]
  },
  password: {
    type: String,
    required: [true, "password is required"]
  },
  otp: {
    type: String,
    required: [true]
  },
  verified: {
    type: Boolean,
    default: false,
    required: [false]
  },
  username: {
    type: String,
    default: "eklavya",
    required: [false]
  },
  friends: {
    type: Array,
    required: false
  },
  pending: {
    type: Array,
    required: false
  }
});

var myquery = mongoose.model("myquery", mquerySchema);

module.exports = myquery;
