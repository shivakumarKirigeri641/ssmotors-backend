const mongoose = require("mongoose");
const servicePriceListSchema = mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
    max: 10000,
    default: 0,
  },
});
const ServicePriceList = mongoose.model(
  "ServicePriceList",
  servicePriceListSchema
);
module.exports = ServicePriceList;
