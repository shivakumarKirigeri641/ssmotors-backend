const mongoose = require("mongoose");
const priceStructureSchema = mongoose.Schema({
  Name: {
    type: String,
    minLength: 3,
    unique: true,
    maxLength: 100,
    required: true,
  },
  amount: {
    type: Number,
    min: 0,
    max: 25000,
    required: true,
    default: 0,
  },
  comments: {
    type: String,
    minLength: 0,
    maxLength: 200,
  },
});
const expectedServiceCostSchema = mongoose.Schema({
  serviceDataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceData",
    required: true,
  },
  jobList: {
    type: [priceStructureSchema.Schema],
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
