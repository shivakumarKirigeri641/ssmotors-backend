const { default: mongoose } = require("mongoose");
const itemDataSchema = require("./itemDataSchema");
const mechanicObservationsSchema = mongoose.Schema({
  serviceDataId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  list: {
    type: [itemDataSchema],
  },
});
const mechanicObservations = mongoose.model(
  "mechanicObservations",
  mechanicObservationsSchema
);
module.exports = mechanicObservations;
