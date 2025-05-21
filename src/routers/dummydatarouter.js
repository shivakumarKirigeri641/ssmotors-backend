const express = require("express");
const dummydataRouter = express.Router();
const ExpectedServiceCost = require("../models/servicesInformation/expectedServiceCost");
const PriceStructure = require("../models/servicesInformation/priceStructure");
dummydataRouter.post("/temp", async (req, res) => {
  try {
    //682d5728bd678e6e5496d6ae
    //make sure if serviceStatus=0, then no paidinformation to be added.
    const data = new ExpectedServiceCost({
      serviceDataId: "682d5728bd678e6e5496d6ae",
      jobList: await PriceStructure.find({}),
    });
    await data.save();
    res.status(200).json({ status: "Ok", message: "success", data });
  } catch (err) {
    res.status(401).json({ status: "Failed", message: err.message });
  }
});
module.exports = dummydataRouter;
