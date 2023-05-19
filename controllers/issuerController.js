const mongoose = require("mongoose");
const Issuer = require("../models/issuerModel");
const Certificate = require("../models/certificateModel");
const bcrypt = require("bcrypt");

const issuerRegistrationRequest = async (req, res) => {
  Issuer.find(
    { email: req.body.email, issuerID: req.body.issuerID },
    async (err, docs) => {
      if (docs === undefined) {
        return res.status(400).json({ message: "Something went wrong" });
      }
      if (docs.length > 0) {
        return res.status(400).json({ message: "Already Registered" });
      } else {
        const salt = await bcrypt.genSalt(5);
        const hash = await bcrypt.hash(req.body.password, salt);
        const newIssuer = new Issuer({
          name: req.body.name,
          issuerID: req.body.issuerID,
          address: req.body.address,
          email: req.body.email,
          password: hash,
          phoneNo: req.body.phoneNo,
          address: req.body.address,
          addedByAdmin: false,
        });
        newIssuer.save((err) => {
          if (!err) {
            res.send("Request Sent Successfully");
          } else {
            res.send("Something went wrong while requesting");
          }
        });
      }
      if (err) {
        return res.status(400).json({ message: "Something went wrong" });
      }
    }
  );
};

const issuerLogin = async (req, res) => {
  Issuer.findOne({ email: req.body.email }, async (err, docs) => {
    if (!docs) {
      return res.status(401).json({ message: "Invalid Credentials" });
    } else {
      const match = await bcrypt.compare(req.body.password, docs.password);
      if (!match) {
        return res.status(401).json({ message: "Invalid Credentials" });
      } else if (docs.addedByAdmin === false) {
        return res.status(401).json({ message: "Not verified by Admin" });
      } else if (docs.address !== req.body.address) {
        return res
          .status(401)
          .json({ message: "Wallet Address does not match" });
      } else {
        return res.status(200).json({
          message: "Login Successful",
          email: docs.email,
          name: docs.name,
          address: docs.address,
          _id: docs._id,
        });
      }
    }
  });
};

const addProgram = async (req, res) => {
  const { currentUser, programDetails } = req.body;
  const issuer = await Issuer.findOne({ _id: currentUser._id });
  const newProgram = {
    programName: programDetails.programName,
    dateOfProgramInitiation: programDetails.initiationDate,
    dateOfCompletion: programDetails.completionDate,
  };
  issuer.programs.push(newProgram);
  issuer.save((err) => {
    if (err) {
      return res.status(400).json({ message: "Something went wrong" });
    } else {
      res.send("Your Program has been added Successfully!");
    }
  });
};

const getIssuerById = async (req, res) => {
  try {
    const issuer = await Issuer.findById({ _id: req.body.userId });
    res.send(issuer);
  } catch (err) {
    return res.status(400).json({ message: "Something went Wrong!" });
  }
};

const issueCertificate = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const certificateUrl = url + "/public/certificates/" + req.file.filename;
  const { formdata, data } = req.body;

  const { currentUserId } = req.body;
  const issuer = await Issuer.findById(currentUserId);
  const certificate = new Certificate({
    cid: req.body.cid,
    holderName: req.body.holderName,
    issuer: issuer._id,
    dateOfCertification: req.body.issuedDate,
    programName: req.body.programName,
    url: certificateUrl,
  });
  //checking if certificate with same hash exists
  //if no, adding to database
  Certificate.find({ cid: certificate.cid }, async (err, docs) => {
    if (docs.length > 0) {
      return res.status(400).send({ message: "Certificate already Exists" });
    } else {
      await certificate.save(async (err) => {
        if (!err) {
          return res.status(200).send(certificate.cid);
        } else {
          return res.status(400).send({ message: "Something Went Wrong" });
        }
      });
      // await contractInfo.contract.methods
      //   .storeCertificate("a", "b", "c", "d", "ce")
      //   .send({ from: issuer.address });
    }
  });
  // console.log("certificate", certificate);
  // const get = await contractInfo.contract.methods
  //   .getCertificate(certificate.cid)
  //   .call();
  // console.log("get", get);
};

module.exports = {
  issuerRegistrationRequest,
  issuerLogin,
  addProgram,
  getIssuerById,
  issueCertificate,
};
