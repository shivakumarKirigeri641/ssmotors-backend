const mongoose = require("mongoose");
const partsAndAccessoryStructure = mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    unique: true,
  },
  itemDescription: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200,
  },
  price: {
    type: Number,
    min: 0,
    max: 20000,
    required: true,
    default: 0,
  },
  s_tax: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
    default: 0,
  },
  c_tax: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
    default: 0,
  },
});
const partsAndAccessoriesSchema = mongoose.Schema({
  serviceDataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceData",
    required: true,
  },
  pandAList: {
    type: [partsAndAccessoryStructure.Schema],
    default: [],
  },
});
const PartsAndAccessories = mongoose.model(
  "PartsAndAccessories",
  partsAndAccessoriesSchema
);
module.exports = PartsAndAccessories;
