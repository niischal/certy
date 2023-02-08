const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Issuer = require("../models/issuerModel");

router.post("/issuerRegistrationRequest", (req, res) => {
  console.log(req.body)
  Issuer.find(
    { email: req.body.email, issuerID: req.body.issuerID },
    (err, docs) => {
      if (docs.length > 0) {
        return res.status(400).json({ message: "Already Registered" });
      } else {
        console.log(req.body)
        const newIssuer = new Issuer({
          name: req.body.name,
          issuerID: req.body.issuerID,
          address: req.body.address,
          email: req.body.email,
          password: req.body.password,
          phoneNo: req.body.phoneNo,
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

router.post("/issuerLogin", (req,res) =>{
  Issuer.findOne({email:req.body.email}, (err, docs) => {
    if(!docs){
      return res.status(400).json({message:"Invalid Credentials"});
    }
    else{
      if(docs.password !== req.body.password) {
        return res.status(400).json({message:"Invalid Credentials"});
      }
      else if(docs.addedByAdmin === false){
        return res.status(400).json({message:"Not verified by Admin"});
      }
      else{
        return res.status(200).json({message:"Login Successful"});
      }
    }
  })
})

module.exports = router;
