const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Issuer = require("../models/issuerModel");
const Certificate = require("../models/certificateModel");

router.post("/getIssuerById", async (req, res) => {
  try {
    const issuer = await Issuer.findOne({ _id: req.body.request.id });
    const program = issuer.programs.filter(
      (program) => program.programName === req.body.request.programName
    );
    const response = {
      issuer: issuer.name,
      program: program,
    };
    res.send(response);
  } catch (err) {
    console.log("err", err);
    return res.status(400).json({ message: "Something went Wrong!" });
  }
});

router.post("/getCertificateByCid", async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ cid: req.body.cid });
    res.send(certificate);
  } catch (err) {
    return res.status(400).json({ message: "Something went Wrong!" });
  }
});

module.exports = router;
