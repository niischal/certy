const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Issuer = require("../models/issuerModel");

router.post("/issuerRegistrationRequest", (req, res) => {
  console.log(req.body);
  Issuer.find(
    { email: req.body.email, issuerID: req.body.issuerID },
    (err, docs) => {
      if (docs.length > 0) {
        return res.status(400).json({ message: "Already Registered" });
      } else {
        const newIssuer = new Issuer({
          name: req.body.name,
          issuerID: req.body.issuerID,
          address: req.body.address,
          email: req.body.email,
          password: req.body.password,
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
});

router.post("/issuerLogin", (req, res) => {
  Issuer.findOne({ email: req.body.email }, (err, docs) => {
    if (!docs) {
      return res.status(401).json({ message: "Invalid Credentials" });
    } else {
      if (docs.password !== req.body.password) {
        return res.status(401).json({ message: "Invalid Credentials" });
      } else if (docs.addedByAdmin === false) {
        return res.status(401).json({ message: "Not verified by Admin" });
      } else {
        return res.status(200).json({
          message: "Login Successful",
          email: docs.email,
          name: docs.name,
          address: docs.address,
          _id: docs._id
        });
      }
    }
  });
});

//Add a new Program
router.post('/addProgram', async(req, res) => {
  const {currentUser, programDetails} = req.body;
  const issuer = await Issuer.findOne({_id: currentUser._id});
  const newProgram = {
    programName: programDetails.programName,
    dateOfProgramInitiation: programDetails.initiationDate,
    dateOfCompletion: programDetails.completionDate
  }
  issuer.programs.push(newProgram)
  issuer.save((err)=>{
    if(err){
      return res.status(400).json({message:'Something went wrong'});
    }
    else{
      res.send("Your Program has been added Successfully!")
    }
  })
});

//Get all Programs by Issuer
router.post('/getIssuerById', async(req, res) => {
  try{
    const issuer = await Issuer.findById({_id: req.body.userId});
    res.send(issuer)
  }
  catch(err){
    return res.status(400).json({message:'Something went Wrong!'});
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

router.post("/acceptIssuerRequest", async (req, res) => {
  await Issuer.findByIdAndUpdate(req.body.issuerId, { addedByAdmin: true });
});

module.exports = router;
