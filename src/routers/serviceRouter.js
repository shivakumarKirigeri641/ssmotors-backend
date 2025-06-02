const express = require("express");
const checkAuthentication = require("../routers/checkAuthentication");
const ServiceData = require("../models/servicesInformation/serviceData");
const VehicleData = require("../models/vehicleData");
const CustomerData = require("../models/customerData");
const mongoose = require("mongoose");
const TwowheelerBrands = require("../models/TwowheelerBrands");
const twowheelerModels = require("../models/TwowheelerModels");
const TwoWheelerVariants = require("../models/twowheelervariants");
const serviceRouter = express.Router();

//fetch latest served vehicles & customer information
serviceRouter.get(
  "/admin/feed/getservicedvehicles",
  checkAuthentication,
  async (req, res) => {
    let data = [];
    try {
      const vehiclelist = await VehicleData.find({});
      const customerlist = await CustomerData.find({});
      for (let i = 0; i < vehiclelist.length; i++) {
        const customer = customerlist.filter(
          (x) => x._id.toString() === vehiclelist[i].customerId.toString()
        );
        data.push({
          vehicleInfo: vehiclelist[i],
          customerInfo: customer[0],
        });
      }
      res.status(200).json({
        status: "Ok",
        data,
      });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
//fetch latest served vehicles & customer information
serviceRouter.get(
  "/admin/feed/getservicingvehicles",
  checkAuthentication,
  async (req, res) => {
    let data = [];
    try {
      const vehiclelist = await VehicleData.find({});
      const customerlist = await CustomerData.find({});
      const servicinglist = await ServiceData.find({
        $or: [{ serviceStatus: 0 }, { serviceStatus: 1 }],
      });
      for (let i = 0; i < vehiclelist.length; i++) {
        const customer = customerlist.filter(
          (x) => x._id.toString() === vehiclelist[i].customerId.toString()
        );
        const servicinginfo = servicinglist.filter(
          (x) => x.vehicleId.toString() === vehiclelist[i]._id.toString()
        );
        if (servicinginfo && 0 < servicinginfo.length) {
          data.push({
            vehicleInfo: vehiclelist[i],
            customerInfo: customer[0],
            servicinginfo: servicinginfo[0],
          });
        }
      }
      res.status(200).json({
        status: "Ok",
        data,
      });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
//fetch individual vehicle & service details
serviceRouter.get(
  "/admin/feed/getservicedetails/:vehicleNumber",
  async (req, res) => {
    const vn = req.params.vehicleNumber;
    const isvehicleexists = await VehicleData.findOne({ vehicleNumber: vn });
    if (!isvehicleexists) {
      throw new Error(`Vehicle number:${vn} does not exists!`);
    }
    const customerInfo = await CustomerData.findById(
      isvehicleexists.customerId
    );
    const serviceInfo = await ServiceData.find({
      vehicleId: isvehicleexists._id,
    });
    res.status(200).json({
      status: "Ok",
      message: "Vehicle found",
      data: {
        vehicleInfo: isvehicleexists,
        customerInfo: customerInfo,
        serviceInfo: serviceInfo,
      },
    });
  }
);
module.exports = serviceRouter;
