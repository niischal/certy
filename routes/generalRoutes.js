const express = require("express");
const router = express.Router();
const {
  getIssuerById,
  getCertificateByCid,
} = require("../controllers/generalController");

router.post("/getIssuerById", getIssuerById);

router.post("/getCertificateByCid", getCertificateByCid);

module.exports = router;
