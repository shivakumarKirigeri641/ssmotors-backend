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
      const vehiclelist = await VehicleData.find({}).populate(
        "variantId",
        "variantName"
      );
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
//fetch latest servicing vehicles & customer information
serviceRouter.get(
  "/admin/feed/getservicingvehicles",
  checkAuthentication,
  async (req, res) => {
    let data = [];
    try {
      const vehiclelist = await VehicleData.find({}).populate(
        "variantId",
        "variantName"
      );
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
          const prevservicedetailslist = await ServiceData.find({
            $and: [
              {
                vehicleId: vehiclelist[i]._id,
              },
              {
                serviceStatus: 2,
              },
            ],
          });
          const prevServiceData =
            prevservicedetailslist[prevservicedetailslist.length - 1];
          data.push({
            vehicleInfo: vehiclelist[i],
            customerInfo: customer[0],
            servicinginfo: servicinginfo[0],
            previousServiceDetails: prevServiceData,
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
