const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    resetLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
