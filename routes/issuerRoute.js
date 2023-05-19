const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {
  issuerLogin,
  addProgram,
  getIssuerById,
  issueCertificate,
  issuerRegistrationRequest,
} = require("../controllers/issuerController");

//For File Upload
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }
    if (!fs.existsSync("public/certificates")) {
      fs.mkdirSync("public/certificates");
    }
    callback(null, "public/certificates");
  },
  filename: (req, file, callback) => {
    const fileName =
      "Certificate" +
      "-" +
      file.originalname.toLowerCase().split(" ").join("-");
    callback(null, fileName);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    var ext = path.extname(file.originalname);
    if (ext !== ".pdf" && ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
      return callback(new Error("Only pdf,jpg,png allowed"));
    }
    callback(null, true);
  },
});

router.post("/issuerRegistrationRequest", issuerRegistrationRequest);
router.post("/issuerLogin", issuerLogin);

router.use(requireAuth);

///Routes

//Add a new Program
router.post("/addProgram", requireAuth, addProgram);

//Get All Programs by Issuer
router.post("/getIssuerById", getIssuerById);

//Issue Certificate

router.post("/issueCertificate", upload.single("file"), issueCertificate);

module.exports = router;
