const app = require("./Routes/index");
const db = require("./Models/Mongo/connect");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5040;

app.listen(PORT, () => {
  console.log("running on " + PORT);
});
