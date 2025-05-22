const express = require("express");
const checkAuthentication = require("../routers/checkAuthentication");
const ServiceData = require("../models/servicesInformation/serviceData");
const VehicleData = require("../models/vehicleData");
const TwowheelerBrands = require("../models/TwowheelerBrands");
const TwowheelerModels = require("../models/TwowheelerModels");
const twowheelerVariants = require("../models/twowheelervariants");
const serviceRouter = express.Router();

//get servicedata with skipi & limits
/*serviceRouter.get(
  "/admin/feed/getservicedvehicles",
  checkAuthentication,
  async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    try {
      const data = await ServiceData.find({})
        .populate("vehicleId")
        .skip(skip)
        .limit(limit);
      res
        .status(200)
        .json({ status: "Ok", message: "Brands fetched successfully", data });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);*/

//w/o limits
serviceRouter.get(
  "/admin/feed/getservicedvehicles",
  checkAuthentication,
  async (req, res) => {
    try {
      //const data = await VehicleData.find({}).populate("variantId", "Name");
      //const datavariant = await twowheelerVariants.find({});
      const result = await twowheelerVariants.updateMany(
        { Name: { $exists: true } },
        { $rename: { Name: "name" } }
      );
      res.status(200).json({
        status: "Ok",
        message: "Brands fetched successfully",
        data: data,
      });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
module.exports = serviceRouter;
