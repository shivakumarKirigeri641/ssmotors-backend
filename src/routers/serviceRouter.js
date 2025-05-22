const express = require("express");
const checkAuthentication = require("../routers/checkAuthentication");
const ServiceData = require("../models/servicesInformation/serviceData");
const VehicleData = require("../models/vehicleData");
const CustomerData = require("../models/customerData");
const TwowheelerBrands = require("../models/TwowheelerBrands");
const twowheelerModels = require("../models/TwowheelerModels");
const TwoWheelerVariants = require("../models/twowheelervariants");
const { populate } = require("dotenv");
const getRandomNames = require("../utils/getRandomNames");
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
      }).populate({
        path: "vehicleId",
        populate: {
          path: "variantId",
          populate: {
            path: "modelId",
            populate: {
              path: "brandId",
              select: "brandName",
            },
          },
        },
      });*/
      /*data = await ServiceData.findOne({
        vehicleId: vehicleidlist[0],
      }).populate({
        path: "vehicleId",
        select: "vehicleId customerName",
      });
      res.status(200).json({
        status: "Ok",
        message: "Brands fetched successfully",
        data: data,
      });*/
      let list = await CustomerData.find({});
      for (let i = 0; i < list.length; i++) {
        list[i].customerName = getRandomNames();
        await list[i].save();
      }
      res.send("test");
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
module.exports = serviceRouter;
