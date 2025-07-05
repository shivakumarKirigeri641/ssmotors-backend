const mongoose = require("mongoose");
const validator = require("validator");
const adminSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      unique: true,
      minLength: 3,
      maxLength: 30,
      required: true,
    },
    lastName: {
      type: String,
      unique: true,
      minLength: 3,
      maxLength: 30,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid!");
        }
      },
    },
    password: {
      type: String,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is ver weak!");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
