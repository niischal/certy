const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Admin = require("../models/adminModel");
const Issuer = require("../models/issuerModel");

const contractInfo = require("../web3");

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

router.post("/acceptIssuerRequest", async (req, res) => {
  const issuer = await Issuer.findById(req.body.issuerId);

  if (!contractInfo.loading && issuer) {
    await Issuer.findByIdAndUpdate(req.body.issuerId, { addedByAdmin: true });
    await contractInfo.contract.methods
      .addIssuer(issuer.address, issuer._id.toString())
      .send({ from: "0x855151B12fFa8189b406356D1CB7f0ae59834519" });

    // const response = await contractInfo.contract.methods
    //   .returnIssuers(issuer.address)
    //   .call();
    // console.log("response", response);
    return res.status(200).json({ message: "Successfully added" });
  } else {
    console.log("contract not loaded");
  }
});

//all issuers
router.get("/allissuers", async (req, res) => {
  const allissuers = await Issuer.find();
  const filteredIssuers = allissuers.filter((issuer) => issuer.addedByAdmin);
  res.send(filteredIssuers);
});

//all request
router.get("/allrequest", async (req, res) => {
  const allissuers = await Issuer.find();
  const filteredIssuers = allissuers.filter((issuer) => !issuer.addedByAdmin);
  res.send(filteredIssuers);
});
module.exports = router;
