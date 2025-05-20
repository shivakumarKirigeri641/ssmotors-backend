const mongoose = require("mongoose");
const nextServiceDetailsSchema = mongoose.Schema({
  serviceDataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceData",
    required: true,
  },
  kmForNextService: {
    type: Number,
    min: 0,
    max: 99999,
    default: 0,
    required: true,
  },
  dateForNextService: {
    type: Date,
    required: true,
    default: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  },
});
const NextServiceDetails = mongoose.model(
  "NextServiceDetails",
  nextServiceDetailsSchema
);
module.exports = NextServiceDetails;
