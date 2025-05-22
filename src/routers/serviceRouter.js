const express = require("express");
const checkAuthentication = require("../routers/checkAuthentication");
const ServiceData = require("../models/servicesInformation/serviceData");
const VehicleData = require("../models/vehicleData");
const TwowheelerBrands = require("../models/TwowheelerBrands");
const TwowheelerModels = require("../models/TwowheelerModels");
const TwoWheelerVariants = require("../models/twowheelervariants");
const { populate } = require("dotenv");
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
    let data = null;
    try {
      let vehicleidlist = await ServiceData.distinct("vehicleId");
      /*data = await ServiceData.findOne({
        vehicleId: vehicleidlist[0],
      }).populate("vehicleId", "vehicleNumber variantId");*/
      /*data = await ServiceData.findOne({
        vehicleId: vehicleidlist[0],
      }).populate({
        path: "vehicleId",
        populate: {
          path: "variantId",
          select: "variantName modelId",
        },
      });*/
      /*data = await ServiceData.findOne({
        vehicleId: vehicleidlist[0],
      }).populate({
        path: "vehicleId",
        populate: {
          path: "variantId",
          select: "variantName modelId",
        },
      });*/
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
