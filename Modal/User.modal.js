const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    email: String,
    password: String,
    confirm: String,
  },
  {
    versionKey: false,
  }
);

const UserModal = mongoose.model("user", UserSchema);
module.exports = { UserModal };
