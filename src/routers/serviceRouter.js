const express = require("express");
const checkAuthentication = require("../routers/checkAuthentication");
const ServiceData = require("../models/servicesInformation/serviceData");
const VehicleData = require("../models/vehicleData");
const CustomerData = require("../models/customerData");
const mongoose = require("mongoose");
const TwowheelerBrands = require("../models/TwowheelerBrands");
const twowheelerModels = require("../models/TwowheelerModels");
const TwoWheelerVariants = require("../models/twowheelervariants");
const CustomerComplaints = require("../models/servicesInformation/customerComplaints");
const AfterServiceComplaints = require("../models/servicesInformation/afterServiceComplaints");
const AfterServicepaidInformation = require("../models/servicesInformation/afterServicePayInformation");
const CurrentStdServicesCheckList = require("../models/servicesInformation/currentStdServicesCheckList");
const CurrentVehicleInspectionCheckList = require("../models/servicesInformation/currentVehicleInspectionCheckList");
const ExpectedServiceCost = require("../models/servicesInformation/expectedServiceCost");
const MechanicObservations = require("../models/servicesInformation/mechanicObservations");
const NextServiceDetails = require("../models/servicesInformation/nextServiceDetails");
const PaidInformation = require("../models/servicesInformation/paidInformation");
const PartsAndAccessories = require("../models/servicesInformation/partsAndAccessories");
const ServiceDeliveryDetails = require("../models/servicesInformation/serviceDeliveryDetails");

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
//fetch individual vehicle, customer & brief service details
serviceRouter.get(
  "/admin/feed/getservicedetails/:vehicleNumber",
  async (req, res) => {
    try {
      let fullServiceData = [];
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
          serviceInfo,
        },
      });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);

//fetch service full detials based on service selected by date (pass serviceid as paramter).
serviceRouter.get(
  "/admin/feed/getservicefulldetails/:serviceid",
  async (req, res) => {
    try {
      const serviceid = req.params.serviceid;
      const serviceinfo = await ServiceData.findById(serviceid);
      if (!serviceinfo) {
        throw new Error("Service information not found!");
      }
      const afterservicecomplaints = await AfterServiceComplaints.findOne({
        serviceDataId: serviceid,
      });
      const afterservicepaymentInformation =
        await AfterServicepaidInformation.findOne({
          serviceDataId: serviceid,
        });
      //CurrentStdServicesCheckList
      const currentStdServicesCheckList =
        await CurrentStdServicesCheckList.findOne({
          serviceDataId: serviceid,
        });
      //CurrentVehicleInspectionCheckList
      const currentVehicleInspectionCheckList =
        await CurrentVehicleInspectionCheckList.findOne({
          serviceDataId: serviceid,
        });
      //CustomerComplaints
      const customerComplaints = await CustomerComplaints.findOne({
        serviceDataId: serviceid,
      });
      //ExpectedServiceCost
      const expectedServiceCost = await ExpectedServiceCost.findOne({
        serviceDataId: serviceid,
      });
      //MechanicObservations
      const mechanicObservations = await MechanicObservations.findOne({
        serviceDataId: serviceid,
      });
      //NextServiceDetails
      const nextServiceDetails = await NextServiceDetails.findOne({
        serviceDataId: serviceid,
      });
      //PaidInformation
      const paidInformation = await PaidInformation.findOne({
        serviceDataId: serviceid,
      });
      //PartsAndAccessories
      const partsAndAccessories = await PartsAndAccessories.findOne({
        serviceDataId: serviceid,
      });
      //ServiceDeliveryDetails
      const serviceDeliveryDetails = await ServiceDeliveryDetails.findOne({
        serviceDataId: serviceid,
      });
      res.status(200).json({
        status: "Ok",
        message: "Vehicle found",
        data: {
          afterservicecomplaints: afterservicecomplaints,
          afterservicepaymentInformation: afterservicepaymentInformation,
          currentStdServicesCheckList: currentStdServicesCheckList,
          currentVehicleInspectionCheckList: currentVehicleInspectionCheckList,
          customerComplaints: customerComplaints,
          expectedServiceCost: expectedServiceCost,
          mechanicObservations: mechanicObservations,
          nextServiceDetails: nextServiceDetails,
          paidInformation: paidInformation,
          partsAndAccessories: partsAndAccessories,
          serviceDeliveryDetails: serviceDeliveryDetails,
        },
      });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
module.exports = serviceRouter;
