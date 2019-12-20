const mongoose = require("mongoose");

const Users = mongoose.model("Users", {
  token: { type: String, default: "" },
  username: { unique: true, type: String, default: "" },
  salt: { type: String, default: "" },
  hash: { type: String, default: "" }
});

module.exports = Users;
