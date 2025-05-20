const mongoose = require("mongoose");
const twowheelerVariantsSchema = mongoose.Schema({
  Name: {
    type: String,
    unique: true,
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
const twowheelerVariants = mongoose.model(
  "twowheelerVariants",
  twowheelerVariantsSchema
);
module.exports = twowheelerVariants;
