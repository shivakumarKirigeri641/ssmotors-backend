const mongoose = require("mongoose");
const vehicleInspectionCheckListSchema = mongoose.Schema({
  inspectionName: {
    type: String,
    unique: true,
    minLength: 3,
    maxLength: 30,
    required: true,
  },
  inspectionLists: {
    type: [String],
    required: true,
  },
  fuelLevel: {
    type: Number,
    min: 0,
    max: 100,
  },
});
const VehicleInspectionCheckList = mongoose.model(
  "VehicleInspectionCheckList",
  vehicleInspectionCheckListSchema
);
module.exports = VehicleInspectionCheckList;
