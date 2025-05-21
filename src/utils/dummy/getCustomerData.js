const CustomerData = require("../../models/customerData");
const getRandomNames = require("../dummy/getRandomNames");
const getRandomPhoneNumber = require("./getRandomPhoneNumber");
const getRandomAddress = require("./getRandomAddress");
const getCustomerData = (vehicleidentification) => {
  return new CustomerData({
    name: getRandomNames(),
    primaryMobileNumber: getRandomPhoneNumber(),
    preferredMobileNumber: getRandomPhoneNumber(),
    address: getRandomAddress(),
    vehicleId: vehicleidentification,
  });
};
