const express = require("express");
const getRandomNumber = require("../utils/getRandomNumber");
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

//w/o limits
serviceRouter.get(
  "/admin/feed/getservicedvehicles",
  checkAuthentication,
  async (req, res) => {
    let data = null;
    try {
      const vehicleData = await VehicleData.find({})
        .populate({
          path: "variantId",
          select: "variantName",
        })
        .populate({
          path: "customerId",
          select: "customerName primaryMobileNumber",
        });
      const customerData = await CustomerData.find({});
      const serviceData = await ServiceData.find({});

      //vehiclenumber, id, customerid, variant, latest service info
      let servedInfo = [];
      vehicleData.forEach((x) => {
        const services = serviceData.filter(
          (y) => y.vehicleId.toString() === x._id.toString()
        );
        if (0 < services.length) {
          const servicedata = services[services.length - 1];
          servedInfo.push({
            vehicleAndCustomer: x,
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
