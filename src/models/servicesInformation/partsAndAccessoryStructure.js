const mongoose = require("mongoose");
const partsAndAccessoryStructureSchema = mongoose.Schema({
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
  stateTax: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
    default: 0,
  },
  centralTax: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
    default: 0,
  },
});
const PartsAndAccessoryStructure = mongoose.model(
  "PartsAndAccessoryStructure",
  partsAndAccessoryStructureSchema
);
module.exports = PartsAndAccessoryStructure;
