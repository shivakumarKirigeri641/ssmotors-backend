const NextServiceDetails = require("../../models/servicesInformation/nextServiceDetails");
const getNextServiceDate = require("./getNextServiceDate");
const getNextServiceDetails = (serviceIdentification) => {
  return new NextServiceDetails({
    serviceDataId: serviceIdentification,
    kmForNextService: getRandomNumber(5000, 99999),
    dateForNextService: getNextServiceDate(),
  });
};
module.exports = getNextServiceDetails;
