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
const summaryRouter = express.Router();

//fetch service summary
summaryRouter.get(
  "/admin/feed/getservicesummary",
  checkAuthentication,
  async (req, res) => {
    try {
      const servicescount = await ServiceData.collection.countDocuments();
      const vehicleservicedcount =
        await VehicleData.collection.countDocuments();

      const totalearnings = await PaidInformation.find({});
      let sum = 0;
      totalearnings.forEach((element) => {
        sum = sum + element.onlinePay;
      });
      res.status(200).json({
        status: "Ok",
        data: {
          servicesCount: servicescount,
          vehiclesServed: vehicleservicedcount,
          overallearnings: sum,
        },
      });
    } catch (err) {
      res.status(401).json({ status: "Failed", message: err.message });
    }
  }
);
module.exports = summaryRouter;
