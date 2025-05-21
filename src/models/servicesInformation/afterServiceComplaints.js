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
    max: 25000,
    required: true,
    default: 0,
  },
});
const afterServiceComplaintsSchema = mongoose.Schema({
  serviceDataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceData",
    required: true,
  },
  complaints: {
    type: [afterServiceComplaintsStrutureSchema],
  },
});
const AfterServiceComplaints = mongoose.model(
  "AfterServiceComplaints",
  afterServiceComplaintsSchema
);
module.exports = AfterServiceComplaints;
