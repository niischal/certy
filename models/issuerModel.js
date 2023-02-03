const mongoose = require("mongoose");

const certificateSchema = mongoose.Schema({
  cid: {
    type: String,
    require: true,
  },
  holderName: {
    type: String,
    require: true,
  },
  issuer: {},
  dateOfCertification: {
    type: Date,
    require: true,
  },
  programName: {
    type: String,
    require: true,
  },
});

const issuerSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  issuerID: {
    type: String,
    require: String,
  },
  address: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  phoneNo: {
    type: String,
    require: true,
  },
  addedByAdmin: {
    type: Boolean,
    require: true,
    default: false
  },
  certificates: [certificateSchema],
});

const Issuer = mongoose.model("issuers", issuerSchema);

module.exports = Issuer;
