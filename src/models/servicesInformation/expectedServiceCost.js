const mongoose = require("mongoose");
const PriceStructure = require("../servicesInformation/priceStructure");
const expectedServiceCostSchema = mongoose.Schema({
  serviceDataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceData",
    required: true,
  },
  jobList: {
    type: [PriceStructure.Schema],
    required: true,
  },
  comments: {
    type: String,
    default: "",
    minLength: 0,
    maxLength: 200,
  },
});
const ExpectedServiceCost = mongoose.model(
  "ExpectedServiceCost",
  expectedServiceCostSchema
);
module.exports = ExpectedServiceCost;
