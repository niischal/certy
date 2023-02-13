const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
let dbConnection = require("./db");

let contractInfo = require("./web3");
let issuerRoute = require("./routes/issuerRoute");
let adminRoute = require("./routes/adminRoute");
app.use(bodyParser.json());
app.use("/api/issuer", issuerRoute);
app.use("/api/admin", adminRoute);
app.get("/", async (req, res) => {});

const port = process.env.PORT;
app.listen(port, () => console.log("Node JS Server Started"));
