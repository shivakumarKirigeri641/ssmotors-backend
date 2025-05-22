const mongoose = require("mongoose");
const twowheelerVariantsSchema = mongoose.Schema({
  variantName: {
    type: String,
    required: true,
    minLength: 3,
  },
  photourl: {
    type: String,
  },
  modelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TwowheelerModels",
    required: true,
  },
});
const TwoWheelerVariants = mongoose.model(
  "TwoWheelerVariants",
  twowheelerVariantsSchema
);
module.exports = TwoWheelerVariants;
