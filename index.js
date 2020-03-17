const app = require("./Routes/index");
const db = require("./Models/Mongo/connect");

const PORT = process.env.PORT || 5040;

app.listen(PORT, () => console.log(`Closure is on ${PORT}`));
