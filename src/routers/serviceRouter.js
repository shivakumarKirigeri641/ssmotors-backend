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
      data = data.sort(
        (a, b) => b.serviceSequenceNumber - a.serviceSequenceNumber
      );
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
        console.log(i);
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
      data = data.sort(
        (a, b) => b.serviceSequenceNumber - a.serviceSequenceNumber
      );
      res.status(200).json({
        status: "Ok",
        data,
      });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
//fetch full service details on a given vehicle number
serviceRouter.get(
  "/admin/feed/getvehicledetails/:vehiclenumber",
  checkAuthentication,
  async (req, res) => {
    let data = [];
    try {
      const vehiclenumber = req.params.vehiclenumber;
      if (!vehiclenumber) {
        throw new Error("Invalid vehicle information provided!");
      }
      //fetch vehicle information
      let allinfo = await VehicleData.findOne({ vehicleNumber: vehiclenumber })
        .populate("variantId")
        .populate("customerId")
        .populate("serviceDataId");
      res.status(200).json({
        status: "Ok",
        allinfo,
      });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
module.exports = serviceRouter;
