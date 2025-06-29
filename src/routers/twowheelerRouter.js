const express = require("express");
const VehicleData = require("../models/vehicleData");
const CustomerData = require("../models/customerData");
const TwowheelerModels = require("../models/TwowheelerModels");
const TwowheelerBrands = require("../models/TwowheelerBrands");
const twowheelerVariants = require("../models/twowheelervariants");
const Twowheelervariants = require("../models/twowheelervariants");
const checkAuthentication = require("./checkAuthentication");
const twowheelerRouter = express.Router();

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
    const resultbranddata = await TwowheelerBrands.findOne({
      brandName: brandName,
    });
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
    const resultbranddata = await TwowheelerBrands.findOne({
      brandName: brandName,
    });
    if (!resultbranddata) {
      throw new Error("Brand information not found!");
    }
    const resultmodeldata = await TwowheelerModels.findOne({
      modelName: modelName,
    });
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
twowheelerRouter.get("/allvehicles", checkAuthentication, async (req, res) => {
  try {
    const data = await twowheelerVariants.collection.distinct("variantName");
    res
      .status(200)
      .json({ status: "Ok", message: "Variants fetched successfully", data });
  } catch (err) {
    res.status(401).json({ status: "Failed", message: err.message });
  }
});

twowheelerRouter.post(
  "/addnewvehicletoservice",
  checkAuthentication,
  async (req, res) => {
    try {
      const jsonobject = req.body;
      const isvehiclenumberpresent = await VehicleData.findOne({
        vehicleNumber: jsonobject.vehicleNumber,
      });
      if (isvehiclenumberpresent) {
        throw new Error(
          `Vehicle with number:${jsonobject.vehicleNumber} already serviced previously. Try searching in served vehicle list`
        );
      }
      const variantdetails = await Twowheelervariants.findOne({
        variantName: jsonobject.variantName,
      });
      const customerInfo = new CustomerData({
        customerName: jsonobject.customerName,
        primaryMobileNumber: jsonobject.mobile1,
        preferredMobileNumber: jsonobject.mobile2,
        email: jsonobject.email,
        address: jsonobject.address,
      });
      const customerresult = await customerInfo.save();
      const vehicleinfo = new VehicleData({
        vehicleNumber: jsonobject.vehicleNumber,
        variantId: variantdetails._id,
        customerId: customerresult._id,
      });
      const resultvehicleinfo = await vehicleinfo.save();
      res.status(200).json({
        status: "Ok",
        message: "Vehicle & customer information registered successfully...",
        customerresult,
        resultvehicleinfo,
      });
    } catch (err) {
      res.json({ status: "Failed", message: err.message });
    }
  }
);
module.exports = twowheelerRouter;
