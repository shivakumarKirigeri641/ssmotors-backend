const { default: mongoose } = require("mongoose");
const itemDataSchema = require("./itemDataSchema");
const mechanicObservationsSchema = mongoose.Schema(
  {
    list: {
      type: [itemDataSchema],
    },
  },
  {
    timestamps: true,
  }
);
const mechanicObservations = mongoose.model(
  "mechanicObservations",
  mechanicObservationsSchema
);
module.exports = mechanicObservations;
