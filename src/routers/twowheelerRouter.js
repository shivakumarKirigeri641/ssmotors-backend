const express = require("express");
const ServiceData = require("../models/serviceData");
const VehicleData = require("../models/vehicleData");
const servicePayments = require("../models/servicePayments");
const customerComplaints = require("../models/customerComplaints");
const partsAndAccessories = require("../models/partsAndAccessories");
const afterServiceComplaints = require("../models/afterServiceComplaints");
const mechanicObservations = require("../models/mechanicObservations");
const StandardServicesCheckList = require("../models/standardServicesCheckList");
const CustomerData = require("../models/customerData");
const TwowheelerModels = require("../models/TwowheelerModels");
const TwowheelerBrands = require("../models/TwowheelerBrands");
const twowheelerVariants = require("../models/twowheelervariants");
const Twowheelervariants = require("../models/twowheelervariants");
const checkAuthentication = require("./checkAuthentication");
const {
  getStandardCheckLists,
} = require("../utils/dummy/getStandardCheckLists");
const e = require("express");
const twowheelerRouter = express.Router();

//get brands
twowheelerRouter.get("/getbrands", checkAuthentication, async (req, res) => {
  try {
    const data = await TwowheelerBrands.find({});
    res
      .status(200)
      .json({ status: "Ok", message: "Brands fetched successfully", data });
  } catch (err) {
    res.status(401).json({ status: "Failed", message: err.message });
  }
});

//getmodels based on brand
twowheelerRouter.get("/getmodels", checkAuthentication, async (req, res) => {
  try {
    const brandName = req.body.brandName;
    if (!brandName) {
      throw new Error("Invalid brand name!");
    }
    const resultbranddata = await TwowheelerBrands.findOne({
      brandName: brandName,
    });
    if (!resultbranddata) {
      throw new Error("Brand information not found!");
    }
    const data = await TwowheelerModels.find({ brandId: resultbranddata._id });
    res
      .status(200)
      .json({ status: "Ok", message: "Models fetched successfully", data });
  } catch (err) {
    res.status(401).json({ status: "Failed", message: err.message });
  }
});

//getmodels based on brand & model
twowheelerRouter.get("/getvariants", checkAuthentication, async (req, res) => {
  try {
    const brandName = req.body.brandName;
    const modelName = req.body.modelName;
    if (!brandName || !modelName) {
      throw new Error("Invalid brand name!");
    }
    const resultbranddata = await TwowheelerBrands.findOne({
      brandName: brandName,
    });
    if (!resultbranddata) {
      throw new Error("Brand information not found!");
    }
    const resultmodeldata = await TwowheelerModels.findOne({
      modelName: modelName,
    });
    if (!resultmodeldata) {
      throw new Error("Model information not found!");
    }
    const data = await twowheelerVariants.find({
      modelId: resultmodeldata._id,
    });
    res
      .status(200)
      .json({ status: "Ok", message: "Variants fetched successfully", data });
  } catch (err) {
    res.status(401).json({ status: "Failed", message: err.message });
  }
});

//get all vehicles
twowheelerRouter.get("/allvehicles", checkAuthentication, async (req, res) => {
  try {
    const data = await twowheelerVariants.collection.distinct("variantName");
    res
      .status(200)
      .json({ status: "Ok", message: "Variants fetched successfully", data });
  } catch (err) {
    res.status(401).json({ status: "Failed", message: err.message });
  }
});

//
twowheelerRouter.get(
  "/admin/getvehiclenumbers",
  checkAuthentication,
  async (req, res) => {
    try {
      const vn = req.params.vehiclenumber;
      const data = await VehicleData.find({}).select("vehicleNumber");
      res.status(200).json({
        status: "Ok",
        message: "vehicle numbers fetched successfully",
        data,
      });
    } catch (err) {
      res.status(404).json({ status: "Failed", message: err.message });
    }
  }
);
twowheelerRouter.post(
  "/admin/insert/addnewvehicletoservice",
  checkAuthentication,
  async (req, res) => {
    const jsonobject = req.body;
    try {
      const isvehiclenumberpresent = await VehicleData.findOne({
        vehicleNumber: jsonobject?.result?.vehicleInfo?.vehicleNumber,
      });
      if (isvehiclenumberpresent) {
        throw new Error(
          `Vehicle with number:${jsonobject?.result?.vehicleInfo?.vehicleNumber} already serviced previously. Try searching in served vehicle list`
        );
      }
      const variantdetails = await Twowheelervariants.findOne({
        variantName: jsonobject?.result?.vehicleInfo?.vehicleVariant,
      });
      let customerInfo = new CustomerData({
        customerName: jsonobject?.result?.customerInfo?.customerName,
        primaryMobileNumber: jsonobject?.result?.customerInfo?.customerMobile,
        preferredMobileNumber: jsonobject?.result?.customerInfo
          ?.customerAltMobile
          ? jsonobject?.result?.customerInfo?.customerAltMobile
          : jsonobject?.result?.customerInfo?.customerMobile,
        email: jsonobject?.result?.customerInfo?.customeremail
          ? jsonobject?.result?.customerInfo?.customeremail
          : "empty@gmail.com",
        address: jsonobject?.result?.customerInfo?.customeraddress
          ? jsonobject?.result?.customerInfo?.customeraddress
          : "<Address not provided>",
      });
      customerInfo = await customerInfo.save();

      //customer complaints
      let customerComplaintsinfo = new customerComplaints({
        list: jsonobject?.result?.customerComplaintsInfo,
      });
      customerComplaintsinfo = await customerComplaintsinfo.save();

      //customer complaints
      let afterServiceComplaintsinfo = new afterServiceComplaints({
        list: [],
      });
      afterServiceComplaintsinfo = await afterServiceComplaintsinfo.save();

      //mech obs
      let mechanicObservationsinfo = new mechanicObservations({
        list: [],
      });
      mechanicObservationsinfo = await mechanicObservationsinfo.save();

      //partsAndAccessories
      let partsAndAccessoriesinfo = new partsAndAccessories({
        list: [],
      });
      partsAndAccessoriesinfo = await partsAndAccessoriesinfo.save();

      //servicePayments
      let servicePaymentsinfo = new servicePayments({
        list: [
          {
            title: "Wash",
            description: "Water wash internal/external",
            isAmountPayable: true,
            amount: 350,
          },
          {
            title: "Labour charge",
            description: "Default servicing charges applied",
            isAmountPayable: true,
            amount: 500,
          },
          {
            title: "Engine oil",
            description: "Castrol engine oil replacement",
            isAmountPayable: true,
            amount: 720,
            cGST: 18,
            sGST: 18,
          },
        ],
      });
      servicePaymentsinfo = await servicePaymentsinfo.save();

      //StandardServicesCheckList
      let StandardServicesCheckListinfo = new StandardServicesCheckList({
        list: getStandardCheckLists(),
      });
      StandardServicesCheckListinfo =
        await StandardServicesCheckListinfo.save();

      //now create ServiceData
      let exitdate = new Date(
        jsonobject?.result?.vehicleInfo.vehicleServiceOutDate
      );
      let servcelist = [];
      let nextservdate = new Date(exitdate).setDate(exitdate.getDate() + 50);
      servcelist.push({
        kmDriven: parseInt(jsonobject?.result?.vehicleInfo.kmDriven),
        dateOfVehicleEntry: new Date(
          jsonobject?.result?.vehicleInfo.vehicleServiceInDate
        ),
        dateOfVehicleExit: new Date(
          jsonobject?.result?.vehicleInfo.vehicleServiceOutDate
        ),
        kmForNextService:
          parseInt(jsonobject?.result?.vehicleInfo.kmDriven) + 2500,
        dateForNextService: nextservdate,
        serviceSequenceNumber: 1,
        serviceStatus: 0,
        isLatestService: true,
        fuelPercentBeforeService: parseInt(
          jsonobject?.result?.vehicleInfo.fuelPresent
        ),
        afterServiceComplaintsId: afterServiceComplaintsinfo._id,
        customerComplaintsId: customerComplaintsinfo._id,
        mechanicObservationsId: mechanicObservationsinfo._id,
        partsAndAccessoriesId: partsAndAccessoriesinfo._id,
        servicePaymentsId: servicePaymentsinfo._id,
        StandardServicesCheckListId: StandardServicesCheckListinfo._id,
      });
      let serviceDatainfo = new ServiceData({
        list: servcelist,
      });
      serviceDatainfo = await serviceDatainfo.save();
      let vehicleInfo = new VehicleData({
        vehicleNumber: jsonobject?.result?.vehicleInfo?.vehicleNumber,
        variantId: variantdetails._id,
        customerId: customerInfo._id,
        serviceDataId: serviceDatainfo._id,
      });
      vehicleInfo = await vehicleInfo.save();
      res.status(200).json({
        status: "Ok",
        message: "Vehicle & customer information registered successfully...",
        data: vehicleInfo,
      });
    } catch (err) {
      res.json({
        status: "Failed",
        message: err.message,
        yourdata: jsonobject,
      });
    }
  }
);
twowheelerRouter.get("/temp", async (req, res) => {
  try {
    //CUSTOMER:685e86ef01d82c6aa40733cb
    const jsonobject = await VehicleData.findOne({
      vehicleNumber: "KA31N8147",
    })
      .populate("variantId")
      .populate("customerId")
      .populate("serviceDataId");
    res.status(200).json({
      status: "Ok",
      message: "Vehicle & customer information registered successfully...",
      jsonobject,
    });
  } catch (err) {
    res.json({ status: "Failed", message: err.message });
  }
});
module.exports = twowheelerRouter;
