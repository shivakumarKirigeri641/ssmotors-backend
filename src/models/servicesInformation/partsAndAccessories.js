const mongoose = require("mongoose");
const PartsAndAccessoryStructure = require("./partsAndAccessoryStructure");
const partsAndAccessoriesSchema = mongoose.Schema({
  serviceDataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceData",
    required: true,
  },
  pandAList: {
    type: [PartsAndAccessoryStructure.Schema],
    default: [],
  },
});
const PartsAndAccessories = mongoose.model(
  "PartsAndAccessories",
  partsAndAccessoriesSchema
);
module.exports = PartsAndAccessories;
