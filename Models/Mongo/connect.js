const mongoose = require("mongoose");
var connectionString =
  "mongodb+srv://root:root@cluster0-v8twg.mongodb.net/test?retryWrites=true&w=majority";

// Connect to mongo
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => console.log(err));
