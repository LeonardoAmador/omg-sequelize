const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send({ message: "Here we go!" });
});

app.listen(port, () => {
  console.log(`The server is running on port: ${port}`);
});

module.exports = app;