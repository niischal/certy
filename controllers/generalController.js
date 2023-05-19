const Issuer = require("../models/issuerModel");
const Certificate = require("../models/certificateModel");

const getIssuerById = async (req, res) => {
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
    return res.status(400).json({ message: "Something went Wrong!" });
  }
};
const getCertificateByCid = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ cid: req.body.cid });
    res.send(certificate);
  } catch (err) {
    return res.status(400).json({ message: "Something went Wrong!" });
  }
};

module.exports = { getIssuerById, getCertificateByCid };
