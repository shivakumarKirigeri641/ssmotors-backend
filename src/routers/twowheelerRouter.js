const express = require("express");
const twowheelers = require("../models/twowheelers");
const TwowheelerModels = require("../models/TwowheelerModels");
const TwowheelerBrands = require("../models/TwowheelerBrands");
const twowheelerVariants = require("../models/twowheelervariants");
const checkAuthentication = require("./checkAuthentication");
const { default: mongoose } = require("mongoose");
const twowheelerRouter = express.Router();

//get brands
twowheelerRouter.get("/getbrands", async (req, res) => {
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
twowheelerRouter.get("/getmodels", async (req, res) => {
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
twowheelerRouter.get("/getvariants", async (req, res) => {
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

module.exports = twowheelerRouter;
