const mongoose = require("mongoose");
const AfterServiceComplaints = require("./afterServiceComplaints");
const afterServicepaidInformationSchema = mongoose.Schema({
  afterServiceComplaintsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AfterServiceComplaints",
    required: true,
  },
  cashPay: {
    type: Number,
    required: true,
    min: 0,
    max: 100000,
    default: 0,
  },
  onlinePay: {
    type: Number,
    required: true,
    min: 0,
    max: 100000,
    default: 0,
  },
  comments: {
    type: String,
    default: "",
    minLength: 0,
    maxLength: 200,
  },
});
const AfterServicepaidInformation = mongoose.model(
  "AfterServicepaidInformation",
  afterServicepaidInformationSchema
);
module.exports = AfterServicepaidInformation;
