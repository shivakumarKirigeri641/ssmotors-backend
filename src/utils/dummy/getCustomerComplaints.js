const getRandomNumber = require("./getRandomNumber");
const getCustomerComplaints = (count) => {
  let array = [
    "The engine is making a rattling noise when I accelerate.",

    "There's a noticeable drop in pickup and mileage recently.",

    "Bike vibrates a lot at higher speeds.",

    "The engine stalls frequently in traffic.",
    "Brakes feel too soft and don’t respond quickly.",

    "There’s a squeaking sound when I apply the brakes.",

    "Rear brake is not effective, takes longer to stop.",
    "Headlight is dim even after replacing the bulb.",

    "Indicators are not working properly.",

    "Horn stops working intermittently.",

    "Battery seems to be discharging too quickly.",
    "Front suspension feels too hard, especially on bumps.",

    "Bike pulls to one side while riding.",

    "Feels unstable at high speed or during turns.",
    "Unusual noise from the chain area while riding.",

    "Clicking/ticking sound from the engine side.",

    "There's a knocking sound from the front fork.",

    "Please check and adjust chain tension.",

    "Oil change is due.",

    "Air filter needs cleaning/replacement.",

    "Please do a general service and check all nuts and bolts.",
  ];
  let newarray = [];
  for (let i = 0; i < count; i++) {
    newarray.push(array[getRandomNumber(0, count)]);
  }
  return newarray;
};
module.exports = getCustomerComplaints;
