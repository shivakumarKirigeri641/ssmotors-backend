const mongoose = require("mongoose");
const otherObservationsSchema = mongoose.Schema({
  serviceDataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceData",
    required: true,
  },
  observations: {
    type: [String],
  },
});
const OtherObservations = mongoose.model(
  "OtherObservations",
  otherObservationsSchema
);
module.exports = OtherObservations;
