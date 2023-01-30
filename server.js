const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
var dbConnection = require("./db");

var issuerRoute = require("./routes/issuerRoute");
app.use(bodyParser.json());
app.use("api/issuer", issuerRoute);
app.get("/", (req, res) => {
  res.send("This is from Backend");
});

const port = process.env.PORT;
app.listen(port, () => console.log("Node JS Server Started"));
