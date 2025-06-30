const mongoose = require("mongoose");
const itemDataSchema = require("./itemDataSchema");
const partsAndAccessoriesSchema = mongoose.Schema(
  {
    list: {
      type: [itemDataSchema],
    },
  },
  {
    timestamps: true,
  }
);
const partsAndAccessories = mongoose.model(
  "partsAndAccessories",
  partsAndAccessoriesSchema
);
module.exports = partsAndAccessories;
