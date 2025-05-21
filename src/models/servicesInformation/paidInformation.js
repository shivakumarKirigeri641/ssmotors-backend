const mongoose = require("mongoose");
const paidInformationSchema = mongoose.Schema({
  serviceDataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceData",
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
});
const PaidInformation = mongoose.model(
  "PaidInformation",
  paidInformationSchema
);
module.exports = PaidInformation;
