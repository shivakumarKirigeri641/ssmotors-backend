const mongoose = require("mongoose");
const serviceDataSchema = mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "VehicleData",
  },
  vehicleServiceTimeIn: {
    type: Date,
    required: true,
    default: new Date(),
  },
  teamAllocated: {
    type: Boolean,
    default: true,
    required: true,
  },
  mechanicAllocated: {
    type: Boolean,
    default: true,
    required: true,
  },
  preferredContactNumber: {
    type: String,
    required: true,
    ref: "VehicleData",
  },
  kmDrivenBeforeService: {
    type: Number,
    required: true,
    min: 0,
    max: 99999,
  },
  serviceStatus: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 2,
  },
  serviceSequenceNumber: {
    type: Number,
    required: true,
  },
});
const ServiceData = mongoose.model("ServiceData", serviceDataSchema);
module.exports = ServiceData;
