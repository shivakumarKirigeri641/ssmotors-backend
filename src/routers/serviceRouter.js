const express = require("express");
const checkAuthentication = require("../routers/checkAuthentication");
const ServiceData = require("../models/serviceData");
const VehicleData = require("../models/vehicleData");
const CustomerData = require("../models/customerData");
const serviceRouter = express.Router();

//fetch latest served vehicles & customer information
serviceRouter.get(
  "/admin/feed/getservicedvehicles",
  checkAuthentication,
  async (req, res) => {
    let data = [];
    try {
      //isLatestService
      let data = [];
      let servedVehicleInfos = await VehicleData.find({})
        .populate("variantId")
        .populate("customerId")
        .populate("serviceDataId");
      servedVehicleInfos = servedVehicleInfos.map((item) => ({
        _id: item._id,
        vehicleNumber: item.vehicleNumber,
        vehicleInfo: item.variantId,
        customerInfo: item.customerId,
        latestservice: item.serviceDataId.list.at(-1),
      }));
      res.status(200).json({
        status: "Ok",
        servedVehicleInfos,
      });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
//fetch latest servicing vehicles & customer information
serviceRouter.get(
  "/admin/feed/getservicingvehicles",
  checkAuthentication,
  async (req, res) => {
    let data = [];
    try {
      //isLatestService
      let data = [];
      let servedVehicleInfos = await VehicleData.find({})
        .populate("variantId")
        .populate("customerId")
        .populate("serviceDataId");
      for (let i = 0; i < servedVehicleInfos.length; i++) {
        if (
          servedVehicleInfos[i].serviceDataId.list[
            servedVehicleInfos[i].serviceDataId.list.length - 1
          ].isLatestService
        ) {
          data.push({
            vehicleNumber: servedVehicleInfos[i].vehicleNumber,
            vehicleInfo: servedVehicleInfos[i].variantId,
            customerInfo: servedVehicleInfos[i].customerId,
            latestService:
              servedVehicleInfos[i].serviceDataId.list[
                servedVehicleInfos[i].serviceDataId.list.length - 1
              ],
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
//fetch services dates a given vehicle number
serviceRouter.get(
  "/admin/feed/getserviceddates/:vehiclenumber",
  checkAuthentication,
  async (req, res) => {
    let data = [];
    try {
      const vehiclenumber = req.params.vehiclenumber;
      if (!vehiclenumber) {
        throw new Error("Invalid vehicle information provided!");
      }
      //fetch vehicle information
      const vehicleData = await VehicleData.findOne({
        vehicleNumber: vehiclenumber,
      }).populate("variantId", "variantName photourl");
      if (!vehicleData) {
        throw new Error("Invalid vehicle information provided!");
      }
      //fetch customer information
      const customerData = await CustomerData.findById(vehicleData.customerId);
      if (!customerData) {
        throw new Error("Invalid customer information provided!");
      }
      //fetch service information
      let sortedDates = [];
      const serviceinformations = await ServiceData.find({
        vehicleId: vehicleData._id,
      }).select("vehicleServiceTimeIn");
      if (!serviceinformations) {
        throw new Error("No service information found!");
      }
      sortedDates = serviceinformations.sort(
        (a, b) =>
          new Date(b.vehicleServiceTimeIn) - new Date(a.vehicleServiceTimeIn)
      );
      console.log(sortedDates);
      data = { serviceinformations, vehicleData, customerData };
      res.status(200).json({
        status: "Ok",
        data,
      });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
//fetch full service information for a given vehicle Number and service date mentioned.
serviceRouter.get(
  "/admin/feed/getallserviceinfo/:vehiclenumber/:serviceid",
  checkAuthentication,
  async (req, res) => {
    let data = null;
    try {
      data = {};
      res.status(200).json({
        status: "Ok",
        data,
      });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
module.exports = serviceRouter;
