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
      /*const servedVehiclesAndDetails = [];
      const list = await VehicleData.collection.distinct("_id");
      for (let i = 0; i < list.length; i++) {
        const vehicleAndCustomer = await VehicleData.findById(list[i])
          .populate({
            path: "variantId",
            select: "variantName",
          })
          .populate({
            path: "customerId",
            select: "customerName primaryMobileNumber",
          });
        servedVehiclesAndDetails.push({ vehicleAndCustomer });

      }
     res.status(200).json({
        status: "Ok",
        data: servedVehiclesAndDetails,
      });*/
      const vehicleData = await VehicleData.find({});
      const customerData = await CustomerData.find({});
      const serviceData = await ServiceData.find({});

      //vehiclenumber, id, customerid, variant, latest service info
      let servedInfo = [];
      vehicleData.forEach((x) => {
        const customer = customerData.filter(
          (z) => z.customerId === x.customerId
        );
        const services = serviceData.filter(
          (y) => y.vehicleId.toString() === x._id.toString()
        );
        if (0 < services.length) {
          const servicedata = services[services.length - 1];
          servedInfo.push({
            vehicleInfo: x,
            customerInfo: customer[0],
            latestService: servicedata,
          });
        }
      });
      res.status(200).json({
        status: "Ok",
        data: servedInfo,
      });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
module.exports = serviceRouter;
