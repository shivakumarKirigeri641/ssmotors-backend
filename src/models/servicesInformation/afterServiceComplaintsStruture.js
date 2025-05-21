const mongoose = require("mongoose");
const afterServiceComplaintsStrutureSchema = mongoose.Schema({
  complaintTitle: {
    type: String,
    required: true,
    minLength: 0,
    maxLength: 50,
    unique: true,
  },
  complaintDescription: {
    type: String,
    required: true,
    minLength: 0,
    maxLength: 200,
  },
  resolveDescription: {
    type: String,
    default: "",
    minLength: 0,
    maxLength: 200,
  },
  amount: {
    type: Number,
    min: 0,
    max: 100000,
    required: true,
    default: 0,
  },
});
const AfterServiceComplaintsStruture = mongoose.model(
  "AfterServiceComplaintsStruture",
  afterServiceComplaintsStrutureSchema
);
module.exports = AfterServiceComplaintsStruture;
