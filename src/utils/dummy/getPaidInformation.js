const getRandomNumber = require("./getRandomNumber");
const Paidinformation = require("../../models/servicesInformation/paidInformation");
const getPaidInformation = (serviceIdentification) => {
  const pay = getRandomNumber(0, 1);
  const onlineamt = getRandomNumber(2000, 10000);
  const cashamt = getRandomNumber(2000, 10000);
  if (0 === pay) {
    cashamt = 0;
  } else {
    onlineamt = 0;
  }
  return new Paidinformation({
    serviceDataId: serviceIdentification,
    onlinePay: onlineamt,
    cashPay: cashamt,
  });
};
module.exports = getPaidInformation;
