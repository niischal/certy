const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var cors = require("cors");
require("dotenv").config();
let dbConnection = require("./db");

let issuerRoute = require("./routes/issuerRoute");
let adminRoute = require("./routes/adminRoute");
let generalRoute = require("./routes/generalRoutes");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use("/api/issuer", issuerRoute);
app.use("/api/admin", adminRoute);
app.use("/api/general", generalRoute);
app.get("/public/certificates/:id", async (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  const filePath = process.env.ROOT_DIR + `/public/certificates/${id}`;
  console.log("filePath", filePath);
  res.sendFile(filePath);
});

const port = process.env.PORT;
app.listen(port, () => console.log("Node JS Server Started"));
