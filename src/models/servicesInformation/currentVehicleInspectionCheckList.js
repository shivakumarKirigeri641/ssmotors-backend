const mongoose = require("mongoose");
const currentVehicleInspectionCheckListSchema = mongoose.Schema({
  serviceDataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceData",
    required: true,
  },
  inspectionLists: {
    type: [String],
  },
  otherServiceComment: {
    type: String,
    default: "",
  },
  fuelLevel: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
});
const CurrentVehicleInspectionCheckList = mongoose.model(
  "CurrentVehicleInspectionCheckList",
  currentVehicleInspectionCheckListSchema
);
module.exports = CurrentVehicleInspectionCheckList;
