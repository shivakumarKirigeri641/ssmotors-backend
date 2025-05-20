const mongoose = require("mongoose");
const serviceDeliveryDetailsSchema = mongoose.Schema({
  serviceDataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceData",
    required: true,
  },
  expectedDeliveryDate: {
    type: Date,
    required: true,
    default: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  },
  modifiedDeliveryDate: {
    type: Date,
    required: true,
    default: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  },
  comments: {
    type: String,
    default: "",
    minLength: 0,
    maxLength: 200,
  },
});
const ServiceDeliveryDetails = mongoose.model(
  "ServiceDeliveryDetails",
  serviceDeliveryDetailsSchema
);
module.exports = ServiceDeliveryDetails;
