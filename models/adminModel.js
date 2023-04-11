const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
});

const Admin = mongoose.model("admins", adminSchema);
module.exports = Admin;
