const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

var connectionString = process.env.MONGO_CONNECTION_STRING;

// Connect to mongo
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch(err => {
    console.log(err);
  });
