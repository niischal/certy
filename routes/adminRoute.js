const express = require("express");
const router = express.Router();

const requireAdmin = require("../middleware/requireAdmin");
const {
  adminLogin,
  acceptIssuerRequest,
  rejectIssuerRequest,
  allissuers,
  allrequest,
} = require("../controllers/adminController");

router.post("/adminLogin", adminLogin);

router.use(requireAdmin);

router.post("/acceptIssuerRequest", acceptIssuerRequest);
//Issuer Reject
router.post("/rejectIssuerRequest", rejectIssuerRequest);

//all issuers
router.get("/allissuers", allissuers);

//all request
router.get("/allrequest", allrequest);
module.exports = router;
