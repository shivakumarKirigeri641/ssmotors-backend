const mongoose = require("mongoose");
const validator = require("validator");
const customerDataSchema = mongoose.Schema({
  Name: {
    type: String,
    minLength: 3,
    maxLength: 50,
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "VehicleData",
  },
  primaryMobileNumber: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 10,
    validate(value) {
      for (let char of value) {
        if (isNaN(char)) {
          throw new Error("Invalid mobile number!");
        }
      }
    },
  },
  preferredMobileNumber: {
    type: String,
    minLength: 10,
    maxLength: 10,
    validate(value) {
      for (let char of value) {
        if (isNaN(char)) {
          throw new Error("Invalid mobile number!");
        }
      }
    },
  },
  address: {
    type: String,
    minLength: 3,
    maxLength: 100,
  },
  email: {
    type: String,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email provided!");
      }
    },
  },
});
const CustomerData = mongoose.model("CustomerData", customerDataSchema);
module.exports = CustomerData;
