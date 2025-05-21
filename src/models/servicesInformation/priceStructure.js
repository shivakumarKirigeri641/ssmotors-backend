const mongoose = require("mongoose");
const priceStructureSchema = mongoose.Schema({
  itemName: {
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
    default: "",
    maxLength: 200,
  },
});
const PriceStructure = mongoose.model("PriceStructure", priceStructureSchema);
module.exports = PriceStructure;
