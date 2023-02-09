const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Admin = require("../models/adminModel");

router.post("/adminLogin", (req, res) => {
  console.log("req.body", req.body.username);
  Admin.findOne(
    { username: req.body.adminLoginDetails.username },
    (err, docs) => {
      if (err) {
        console.log("err", err);
      }
      console.log("docs", docs);
      if (!docs) {
        return res.status(401).json({ message: "Invalid Credentials" });
      } else {
        if (docs.password !== req.body.adminLoginDetails.password) {
          console.log("docsa", docs);
          return res.status(401).json({ message: "Invalid Credentials" });
        } else {
          return res.status(200).json({ message: "Login Successful" });
        }
      }
    }
  );
});

module.exports = router;
