const express = require("express");
const TwowheelerModels = require("../models/TwowheelerModels");
const TwowheelerBrands = require("../models/TwowheelerBrands");
const twowheelerVariants = require("../models/twowheelervariants");
const checkAuthentication = require("./checkAuthentication");
const { default: mongoose, mongo } = require("mongoose");
const twowheelerRouter = express.Router();

const PartsAndAccessories = require("../models/servicesInformation/partsAndAccessories");
const ServiceDeliveryDetails = require("../models/servicesInformation/serviceDeliveryDetails");
const AfterServiceComplaints = require("../models/servicesInformation/afterServiceComplaints");
const AfterServiceComplaintsStruture = require("../models/servicesInformation/afterServiceComplaintsStruture");
const PaidInformation = require("../models/servicesInformation/paidInformation");
const PartsAndAccessoryStructure = require("../models/servicesInformation/partsAndAccessoryStructure");

//get brands
twowheelerRouter.get("/getbrands", checkAuthentication, async (req, res) => {
  try {
    const data = await TwowheelerBrands.find({});
    res
      .status(200)
      .json({ status: "Ok", message: "Brands fetched successfully", data });
  } catch (err) {
    res.status(401).json({ status: "Failed", message: err.message });
  }
});

//getmodels based on brand
twowheelerRouter.get("/getmodels", checkAuthentication, async (req, res) => {
  try {
    const brandName = req.body.brandName;
    if (!brandName) {
      throw new Error("Invalid brand name!");
    }
    const resultbranddata = await TwowheelerBrands.findOne({ Name: brandName });
    if (!resultbranddata) {
      throw new Error("Brand information not found!");
    }
    const data = await TwowheelerModels.find({ brandId: resultbranddata._id });
    res
      .status(200)
      .json({ status: "Ok", message: "Models fetched successfully", data });
  } catch (err) {
    res.status(401).json({ status: "Failed", message: err.message });
  }
});

//getmodels based on brand & model
twowheelerRouter.get("/getvariants", checkAuthentication, async (req, res) => {
  try {
    const brandName = req.body.brandName;
    const modelName = req.body.modelName;
    if (!brandName || !modelName) {
      throw new Error("Invalid brand name!");
    }
    const resultbranddata = await TwowheelerBrands.findOne({ Name: brandName });
    if (!resultbranddata) {
      throw new Error("Brand information not found!");
    }
    const resultmodeldata = await TwowheelerModels.findOne({ Name: modelName });
    if (!resultmodeldata) {
      throw new Error("Model information not found!");
    }
    const data = await twowheelerVariants.find({
      modelId: resultmodeldata._id,
    });
    res
      .status(200)
      .json({ status: "Ok", message: "Variants fetched successfully", data });
  } catch (err) {
    res.status(401).json({ status: "Failed", message: err.message });
  }
});

//temp api
twowheelerRouter.post("/temp", async (req, res) => {
  //682ccc1faa56267864d2e10a
  //682d5728bd678e6e5496d6ae
  const sub1 = new PartsAndAccessoryStructure({
    itemName: "switch",
    itemDescription: "Main switch for head light to be replaced.",
    price: 350,
    stateTax: 18,
    centralTax: 18,
  });
  const sub2 = new PartsAndAccessoryStructure({
    itemName: "switch",
    itemDescription: "Main switch for head light to be replaced.",
    price: 350,
    stateTax: 18,
    centralTax: 18,
  });
  const data2 = new PartsAndAccessories({
    serviceDataId: "682d5728bd678e6e5496d6ae",
    pandAList: [sub2],
  });
  await data2.save();
  res.send(data2);
});
module.exports = twowheelerRouter;
