const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
let dbConnection = require("./db");

let issuerRoute = require("./routes/issuerRoute");
let adminRoute = require("./routes/adminRoute");
let generalRoute = require("./routes/generalRoutes");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use("/api/issuer", issuerRoute);
app.use("/api/admin", adminRoute);
app.use("/api/general", generalRoute);
app.get("/", async (req, res) => {});

const port = process.env.PORT;
app.listen(port, () => console.log("Node JS Server Started"));
