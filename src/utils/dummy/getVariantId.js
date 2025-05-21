const mongoose = require("mongoose");
const Twowheelervariants = require("../../models/twowheelervariants");
const getRandomNumber = require("./getRandomNumber");
const getVariantId = async () => {
  const data = await Twowheelervariants.find({});
  return data[getRandomNumber(0, data.length)]._id;
};
