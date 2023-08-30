const express = require("express");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 3000;

routes(app);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`The server is running on port: ${port}`);
});