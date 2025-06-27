const mongoose = require("mongoose");
const itemDataSchema = require("./itemDataSchema");
const partsAndAccessoriesSchema = mongoose.Schema({
  serviceDataId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  list: {
    type: [itemDataSchema],
  },
});
const partsAndAccessories = mongoose.model(
  "partsAndAccessories",
  partsAndAccessoriesSchema
);
module.exports = partsAndAccessories;
