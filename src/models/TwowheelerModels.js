const mongoose = require("mongoose");
const twowheelerModelsSchema = mongoose.Schema({
  Name: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TwoWheelerBrands",
    required: true,
  },
});
const TwowheelerModels = mongoose.model(
  "twowheelerModels",
  twowheelerModelsSchema
);
module.exports = TwowheelerModels;
