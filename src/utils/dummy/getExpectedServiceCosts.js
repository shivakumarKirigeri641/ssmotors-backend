const ExpectedServiceCost = require("../../models/servicesInformation/expectedServiceCost");
const PriceStructure = require("../../models/servicesInformation/priceStructure");
const getExpectedServiceCosts = async (serviceDataIdentification) => {
  return new ExpectedServiceCost({
    serviceDataId: serviceDataIdentification,
    jobList: await PriceStructure.find({}),
  });
};
module.exports = getExpectedServiceCosts;
