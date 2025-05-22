const VehicleData = require("../../models/vehicleData");
const getVehicleNumber = require("../dummy/getVehicleNumber");
const getVariantId = require("../dummy/getVariantId");
const getVehicleData = async () => {
  return new VehicleData({
    vehicleNumber: await getVehicleNumber(),
    variantId: await getVariantId(),
  });
};
module.exports = getVehicleData;
