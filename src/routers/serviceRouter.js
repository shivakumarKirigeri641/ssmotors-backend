const express = require("express");
const checkAuthentication = require("../routers/checkAuthentication");
const ServiceData = require("../models/servicesInformation/serviceData");
const VehicleData = require("../models/vehicleData");
const CustomerData = require("../models/customerData");
const mongoose = require("mongoose");
const TwowheelerBrands = require("../models/TwowheelerBrands");
const twowheelerModels = require("../models/TwowheelerModels");
const TwoWheelerVariants = require("../models/twowheelervariants");
const AfterServiceComplaints = require("../models/servicesInformation/afterServiceComplaints");
const AfterServicepaidInformation = require("../models/servicesInformation/afterServicePayInformation");
const CurrentStdServicesCheckList = require("../models/servicesInformation/currentStdServicesCheckList");
const CurrentVehicleInspectionCheckList = require("../models/servicesInformation/currentVehicleInspectionCheckList");
const cusotmercomplaints = require("../models/servicesInformation/customerComplaints");
const CustomerComplaints = require("../models/servicesInformation/customerComplaints");
const ExpectedServiceCosts = require("../models/servicesInformation/expectedServiceCost");
const MechanicObservations = require("../models/servicesInformation/mechanicObservations");
const NextServiceDetails = require("../models/servicesInformation/nextServiceDetails");
const PaidInformation = require("../models/servicesInformation/paidInformation");
const PartsAndAccessories = require("../models/servicesInformation/partsAndAccessories");
const PartsAndAccessoryStructure = require("../models/servicesInformation/partsAndAccessoryStructure");
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
//fetch latest served vehicles & customer information
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
      const vehiclenumber = req.params.vehiclenumber;
      const serviceid = req.params.serviceid;
      if (!vehiclenumber) {
        throw new Error("Invalid vehicle information provided!");
      }
      //fetch vehicle information
      const vehicleData = await VehicleData.findOne({
        vehicleNumber: vehiclenumber,
      }).populate("variantId", "variantName");
      if (!vehicleData) {
        throw new Error("Invalid vehicle information provided!");
      }
      //fetch customer information
      const customerInfo = await CustomerData.findById(vehicleData.customerId);
      if (!customerInfo) {
        throw new Error("Invalid customer information provided!");
      }
      //fetch service information
      const serviceinformation = await ServiceData.findOne({
        $and: [{ _id: serviceid }, { vehicleId: vehicleData._id }],
      });
      if (!serviceinformation) {
        throw new Error("No service information found!");
      }
      //fetch after complaints
      const afterServiceComplaints = await AfterServiceComplaints.findOne({
        serviceDataId: serviceid,
      });
      //fetch after complaints paid info
      const afterServicePayInformation =
        await AfterServicepaidInformation.findOne({
          serviceDataId: serviceid,
        });
      //CurrentStdServicesCheckList
      const currentStdServicesCheckList =
        await CurrentStdServicesCheckList.findOne({
          serviceDataId: serviceid,
        });
      //current insp list
      const currentVehicleInspectionCheckList =
        await CurrentVehicleInspectionCheckList.findOne({
          serviceDataId: serviceid,
        });
      //customer complaints
      const cusotmercomplaints = await CustomerComplaints.findOne({
        serviceDataId: serviceid,
      });
      //expected service costs
      const expectedservicecosts = await ExpectedServiceCosts.findOne({
        serviceDataId: serviceid,
      });
      //mech observations
      const mechanicObservations = await MechanicObservations.findOne({
        serviceDataId: serviceid,
      });
      //next service details
      const nextServiceDetails = await NextServiceDetails.findOne({
        serviceDataId: serviceid,
      });
      //paid info
      const paidInformation = await PaidInformation.findOne({
        serviceDataId: serviceid,
      });
      //parts and acc
      const partsAndAccessories = await PartsAndAccessoryStructure.findOne({
        serviceDataId: serviceid,
      });
      data = {
        vehiceInfo: vehicleData,
        customerInfo: customerInfo,
        serviceInfo: serviceinformation,
        afterServiceComplaints,
        afterServicePayInformation,
        currentStdServicesCheckList,
        currentVehicleInspectionCheckList,
        cusotmercomplaints,
        expectedservicecosts,
        mechanicObservations,
        nextServiceDetails,
        paidInformation,
        partsAndAccessories,
      };
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
