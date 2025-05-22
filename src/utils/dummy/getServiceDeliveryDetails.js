const { default: mongoose } = require("mongoose");
const ServiceDeliveryDetails = require("../../models/servicesInformation/serviceDeliveryDetails");
const getExpectedDeliveryDate = require("./getExpectedDeliveryDate");
const getRandomNumber = require("./getRandomNumber");
const getServiceDeliveryDetails = (serviceidentification, entryDate) => {
  return new ServiceDeliveryDetails({
    serviceDataId: serviceidentification,
    expectedDeliveryDate: getExpectedDeliveryDate(entryDate),
    modifiedDeliveryDate: getExpectedDeliveryDate(
      entryDate,
      getRandomNumber(1, 5)
    ),
  });
};
module.exports = getServiceDeliveryDetails;
