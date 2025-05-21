const VehicleData = require("../../models/vehicleData");
const getVehicleNumber = require("../dummy/getVehicleNumber");
const getVariantId = require("../dummy/getVariantId");
const getVehicleData = () => {
  return new VehicleData({
    vehicleNumber: getVehicleNumber(),
    vairantId: getVariantId(),
  });
};
module.exports = getVehicleData;
