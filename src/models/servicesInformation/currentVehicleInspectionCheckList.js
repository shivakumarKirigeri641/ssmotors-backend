const mongoose = require("mongoose");
const currentVehicleInspectionCheckListSchema = mongoose.Schema({
  serviceDataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceData",
    required: true,
  },
  serviceList: {
    type: [String],
  },
  otherServiceComment: {
    type: String,
    default: "",
  },
});
const CurrentVehicleInspectionCheckList = mongoose.model(
  "CurrentVehicleInspectionCheckList",
  currentVehicleInspectionCheckListSchema
);
module.exports = CurrentVehicleInspectionCheckList;
