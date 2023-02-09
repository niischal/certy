const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/adminModel");

router.post("/adminLogin", (req, res) => {
  User.findOne({ email: req.body.username }, (err, docs) => {
    if (err) {
      console.log("err", err);
    }
    console.log("docs", docs);
    if (!docs) {
      return res.status(400).json({ message: "Invalid Credentials" });
    } else {
      if (docs.password !== req.body.password) {
        return res.status(400).json({ message: "Invalid Credentials" });
      } else {
        return res.status(200).json({ message: "Login Successful" });
      }
    }
  });
});

module.exports = router;
