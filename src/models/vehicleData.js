const mongoose = require("mongoose");
const vehicleDataSchema = mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
    unique: true,
    minLength: 10,
    maxLength: 15,
    validate(value) {
      if (value.length < 10 || value.length > 15) {
        throw new Error("Vehicle number is invalid!");
      }
    },
  },
  variantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Twowheelervariants",
  },
  isElectric: {
    type: Boolean,
    default: false,
    required: true,
  },
});
const VehicleData = mongoose.model("VehicleData", vehicleDataSchema);
module.exports = VehicleData;
