
const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("This is from Backend");
});

const port = process.env.PORT;
app.listen(port, () => console.log("Node JS Server Started"));