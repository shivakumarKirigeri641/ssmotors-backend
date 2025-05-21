const mongoose = require("mongoose");
const mechanicObservationsSchema = mongoose.Schema({
  serviceDataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceData",
    required: true,
  },
  observations: {
    type: [String],
  },
});
const MechanicObservations = mongoose.model(
  "MechanicObservations",
  mechanicObservationsSchema
);
module.exports = MechanicObservations;
