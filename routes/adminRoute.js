const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Admin = require("../models/adminModel");
const Issuer = require("../models/issuerModel");
const requireAdmin = require('../middleware/requireAdmin')

router.post("/adminLogin", (req, res) => {
  Admin.findOne(
    { username: req.body.adminLoginDetails.username },
    (err, docs) => {
      if (err) {
        console.log("err", err);
      }
      if (!docs) {
        return res.status(401).json({ message: "Invalid Credentials" });
      } else {
        if (docs.password !== req.body.adminLoginDetails.password) {
          return res.status(401).json({ message: "Invalid Credentials" });
        } else {
          return res.status(200).json({ message: "Login Successful", adminId: docs._id  });
        }
      }
    }
  );
});

router.use(requireAdmin)

router.post("/acceptIssuerRequest", async (req, res) => {
  await Issuer.findByIdAndUpdate(req.body.issuerId, { addedByAdmin: true })
    .then(() => {
      return res.status(200).json({ message: "Successfully added" });
    })
    .catch((err) => {
      return res.status(300).json({ message: "Something Went Wrong" });
    });
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
