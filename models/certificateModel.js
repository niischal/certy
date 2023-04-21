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
  issuer: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  dateOfCertification: {
    type: Date,
    require: true,
  },
  programName: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
});

const Certificate = mongoose.model("certificates", certificateSchema);
module.exports = Certificate;
