const getRandomNumber = require("./getRandomNumber");
const getAfterServiceComplaints = (count) => {
  let array = [
    "Bike feels sluggish after the service.",

    "Engine noise has increased instead of reducing.",

    "Oil leakage observed after service.",

    "Smoke from exhaust wasn’t there before.",

    "Brakes are squeaking after the service.",

    "Brake performance has worsened – not responsive.",

    "Brake lever feels too tight/loose.",

    "Headlight/indicator stopped working after service.",

    "Horn is not working now.",

    "Battery was working fine before – now the bike isn’t starting.",

    "Chain is too tight and makes noise while riding.",

    "Chain not properly lubricated.",

    "Bike is pulling to one side after wheel alignment.",

    "Front suspension feels harder than before.",

    "Bike wasn’t cleaned properly.",

    "Fuel level dropped significantly – seems like fuel was used.",

    "Service sticker not updated.",

    "Some parts were replaced without my consent.",

    "Rattling sounds started after service.",
  ];
  let newarray = [];
  for (let i = 0; i < count; i++) {
    newarray.push(array[getRandomNumber(0, count)]);
  }
  return newarray;
};
module.exports = getAfterServiceComplaints;
