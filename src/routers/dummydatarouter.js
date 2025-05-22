const express = require("express");
const getExpectedDeliveryDate = require("../utils/dummy/getExpectedDeliveryDate");
const TwowheelerModels = require("../models/TwowheelerModels");
const twowheelerVariants = require("../models/twowheelervariants");
const getRandomNumber = require("../utils/dummy/getRandomNumber");
const fs = require("fs").promises;
const getServiceDeliveryDetails = require("../utils/dummy/getServiceDeliveryDetails");
const getRandomBikeItem = require("../utils/dummy/getRandomBikeItem");
const getCustomerComplaints = require("../utils/dummy/getCustomerComplaints");
const getCustomerData = require("../utils/dummy/getCustomerData");
const getMechanicObservations = require("../utils/dummy/getMechanicObservations");
const getNextServiceDate = require("../utils/dummy/getNextServiceDate");
const CustomerComplaints = require("../models/servicesInformation/customerComplaints");
const Pricestructures = require("../models/servicesInformation/priceStructure");
const getVehicleData = require("../utils/dummy/getVehicleData");
const getPaidInformation = require("../utils/dummy/getPaidInformation");
const VehicleData = require("../models/vehicleData");
const PartsAndAccessories = require("../models/servicesInformation/partsAndAccessories");
const ServiceDeliveryDetails = require("../models/servicesInformation/serviceDeliveryDetails");
const PaidInformation = require("../models/servicesInformation/paidInformation");
const NextServiceDetails = require("../models/servicesInformation/nextServiceDetails");
const MechanicObservations = require("../models/servicesInformation/mechanicObservations");
const CustomerData = require("../models/customerData");
const ServiceData = require("../models/servicesInformation/serviceData");
const TwowheelerBrands = require("../models/TwowheelerBrands");
const Currentstdserviceschecklists = require("../models/servicesInformation/currentStdServicesCheckList");
const ExpectedServiceCosts = require("../models/servicesInformation/expectedServiceCost");
const StandardServicesCheckList = require("../models/standardServicesCheckList");
const VehicleInspectionCheckList = require("../models/servicesInformation/vehicleInspectionCheckList");
const CurrentVehicleInspectionCheckList = require("../models/servicesInformation/currentVehicleInspectionCheckList");
const AfterServiceComplaints = require("../models/servicesInformation/afterServiceComplaints");
const AfterServicePaidInformation = require("../models/servicesInformation/afterServicePayInformation");
const getAfterServiceComplaints = require("../utils/dummy/getAfterServiceComplaints");
const getVariantId = require("../utils/dummy/getVariantId");
const { default: mongoose } = require("mongoose");
const dummydataRouter = express.Router();
dummydataRouter.post("/temp", async (req, res) => {
  try {
    startDate = new Date(2024, 0, 1);
    let today = new Date();
    today = today.setDate(today.getDate() - 5);
    let bikeArray = [];
    let currentDate = new Date(startDate);
    //generate vehicles & customer detials
    for (let i = 0; i < 201; i++) {
      const vehicleData = await getVehicleData();
      let mykmdriven = getRandomNumber(2000, 3000);
      let buffer = 2500;
      let mykmdrivennextservice = Number(mykmdriven) + Number(buffer);
      if (bikeArray.includes((x) => x.registration)) continue;
      bikeArray.push({
        owner: await getCustomerData(vehicleData.variantId),
        variantidentification: vehicleData.variantId,
        registration: vehicleData.vehicleNumber,
        serviceDate: startDate,
        nextserviceDate: getNextServiceDate(startDate),
        kmDriven: mykmdriven,
        kmTobeDrivenForNextService: mykmdrivennextservice,
        firstTimeService: true,
      });
    }

    //now got full vehicle details list of 300 count
    startDate = new Date(2024, 0, 1);
    today = new Date();
    today = today.setDate(today.getDate() - 5);
    currentDate = new Date(startDate);
    while (currentDate <= today) {
      console.log("processing dsate", currentDate);
      //check if its due for service?
      //if yes-> insert all records-1. update next service date, update kmdrivenbefore service & next service
      //if no->increment date & randome number of km to kmdrkmDriven
      for (let i = 0; i < bikeArray.length; i++) {
        bikeArray[i].kmDriven = bikeArray[i].kmDriven + getRandomNumber(50, 80);
        bikeArray[i].serviceDate = new Date(
          bikeArray[i].serviceDate.setDate(currentDate.getDate() + 1)
        );
        //check if service due is there?
        if (
          bikeArray[i].kmDriven >= bikeArray[i].kmTobeDrivenForNextService ||
          bikeArray[i].serviceDate >= bikeArray[i].nextserviceDate
        ) {
          //add to service record
          //console.log("generating vehicle:", bikeArray[i]);
          let vehicledata = await VehicleData.find({
            vehicleNumber: bikeArray[i].registration,
          });
          let insertedvehicledata = null;
          let vehicleid = null;
          let resultcustomerdta = null;
          if (0 < vehicledata.length) {
            resultcustomerdta = await CustomerData.find({
              vehicleId: vehicledata[0]._id,
            });
            vehicleid = vehicledata[0]._id;
          } else {
            vehicledata = new VehicleData({
              vehicleNumber: bikeArray[i].registration,
              variantId: bikeArray[i].variantidentification,
            });
            insertedvehicledata = await vehicledata.save();
            vehicleid = insertedvehicledata._id;
            console.log("vehicle data done");
            //customerdata
            const result = new CustomerData({
              vehicleId: insertedvehicledata._id,
              primaryMobileNumber: bikeArray[i].owner.primaryMobileNumber,
              preferredMobileNumber: bikeArray[i].owner.preferredMobileNumber,
              address: bikeArray[i].owner.address,
              email: bikeArray[i].owner.email,
            });
            const insertedcustomerData = await result.save();
          }
          console.log("customer data done");
          //service data
          const servicedata = new ServiceData({
            vehicleId: vehicleid,
            vehicleServiceTimeIn: bikeArray[i].serviceDate,
            preferredContactNumber: bikeArray[i].owner.preferredMobileNumber,
            kmDrivenBeforeService: bikeArray[i].kmDriven,
            serviceStatus: 2,
          });
          const insertedserviceData = await servicedata.save();
          console.log("insertedserviceData");
          //after service complaints
          const afterservicecomplaints = new AfterServiceComplaints({
            serviceDataId: insertedserviceData._id,
            complaints: getAfterServiceComplaints(getRandomNumber(0, 4)),
          });
          const insertedafterservicecomplaints =
            await afterservicecomplaints.save();
          console.log("insertedafterservicecomplaints");
          //AfterServicePaidInformation
          let pay = getRandomNumber(0, 1);
          let onlineamt = getRandomNumber(0, 500);
          let cashamt = getRandomNumber(0, 1000);
          if (0 === pay) {
            cashamt = 0;
          } else {
            onlineamt = 0;
          }

          //after service complaint pay
          const afterServicePaidInformation = new AfterServicePaidInformation({
            afterServiceComplaintsId: insertedafterservicecomplaints._id,
            cashPay: cashamt,
            cashPay: onlineamt,
          });
          const insertedafterServicePaidInformation =
            await afterServicePaidInformation.save();
          console.log("afterServicePaidInformation");
          //std service
          const stdservice = new Currentstdserviceschecklists({
            serviceDataId: insertedserviceData._id,
            serviceList: await StandardServicesCheckList.find({}),
          });
          const insertedstdservice = await stdservice.save();

          //vehicle inspection servie
          const vehicleinspectionservice =
            new CurrentVehicleInspectionCheckList({
              serviceDataId: insertedserviceData._id,
              inspectionLists: await VehicleInspectionCheckList.find({}),
            });
          const insertedvehicleinspectionservice =
            await vehicleinspectionservice.save();
          console.log("vehicleinspectionservice");
          //customer complaints
          const custcomplaints = new CustomerComplaints({
            serviceDataId: insertedserviceData._id,
            complaints: getCustomerComplaints(getRandomNumber(0, 6)),
          });
          const insertedcustcomplaints = await custcomplaints.save();
          console.log("insertedcustcomplaints");
          //expected service costs
          const expectedservicecosts = new ExpectedServiceCosts({
            serviceDataId: insertedserviceData._id,
            jobList: await Pricestructures.find({}),
          });
          const insertedexpectedservicecosts =
            await expectedservicecosts.save();
          console.log("expectedservicecosts");
          //mechanical observations
          const mechobs = new MechanicObservations({
            serviceDataId: insertedserviceData._id,
            observations: getMechanicObservations(6),
          });
          const insertedmechobs = await mechobs.save();
          console.log("insertedmechobs");
          //next servcie
          bikeArray[i].kmDriven = bikeArray[i].kmTobeDrivenForNextService;
          bikeArray[i].serviceDate = bikeArray[i].nextserviceDate;
          bikeArray[i].kmTobeDrivenForNextService =
            bikeArray[i].kmTobeDrivenForNextService + 2600;
          bikeArray[i].serviceDate = getNextServiceDate(
            bikeArray[i].serviceDate
          );
          const nextservice = new NextServiceDetails({
            serviceDataId: insertedserviceData._id,
            kmForNextService: Number(
              bikeArray[i].kmTobeDrivenForNextService + 2600
            ),
            dateForNextService: bikeArray[i].serviceDate,
          });
          const insertednextservcie = await nextservice.save();
          console.log("insertednextservcie");
          //paid information
          const paidinfo = getPaidInformation(insertedserviceData._id);
          await paidinfo.save();
          console.log("paidinfo");
          //parst & accessories
          const parstandaccessories = new PartsAndAccessories({
            serviceDataId: insertedserviceData._id,
            pAndAList: [
              getRandomBikeItem(),
              getRandomBikeItem(),
              getRandomBikeItem(),
            ],
          });
          await parstandaccessories.save();
          console.log("parstandaccessories");
          //service delivery detalis
          const servicddeliverydetails = new ServiceDeliveryDetails({
            serviceDataId: insertedserviceData._id,
            expectedDeliveryDate: insertedserviceData.vehicleServiceTimeIn,
            modifiedDeliveryDate: insertedserviceData.vehicleServiceTimeIn,
          });
          await servicddeliverydetails.save();
          console.log("servicddeliverydetails");
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    res.status(200).json({ status: "Ok", message: "success" });
  } catch (err) {
    res.status(401).json({ status: "Failed", message: err.message });
  }
});
dummydataRouter.delete("/deletecollections", async (req, res) => {
  await AfterServiceComplaints.collection.drop();
  await AfterServicePaidInformation.collection.drop();
  await CurrentVehicleInspectionCheckList.collection.drop();
  await Currentstdserviceschecklists.collection.drop();
  await CustomerComplaints.collection.drop();
  await CustomerData.collection.drop();
  await ExpectedServiceCosts.collection.drop();
  await MechanicObservations.collection.drop();
  await NextServiceDetails.collection.drop();
  await PaidInformation.collection.drop();
  await PartsAndAccessories.collection.drop();
  await ServiceData.collection.drop();
  await VehicleData.collection.drop();
  await ServiceDeliveryDetails.collection.drop();
  res.send("deleted");
});

dummydataRouter.post("/insert-brand-model-variant", async (req, res) => {
  try {
    /*const data = await fs.readFile("./bikes.json", "utf-8");
    const rawData = JSON.parse(data);
    for (let i = 0; i < rawData.length; i++) {
      const brand = new TwowheelerBrands({
        brandName: rawData[i].Name,
        logourl: rawData[i].logourl,
      });
      await brand.save();
    }*/
    const brandresult = await TwowheelerBrands.find({});
    const data = await fs.readFile("./bikes.json", "utf-8");
    const rawData = JSON.parse(data);

    for (let i = 0; i < brandresult.length; i++) {
      const _id = brandresult[i]._id;
      console.log("processing brand:", brandresult[i].brandName);
      for (let j = 0; j < rawData.length; j++) {
        if (rawData[j].Name === brandresult[i].brandName) {
          //bikes
          for (let k = 0; k < rawData[j].bikeModelList.length; k++) {
            const modeldata = new TwowheelerModels({
              modelName: rawData[j].bikeModelList[k].Name,
              brandId: _id,
            });
            const resultmodeldata = await modeldata.save();
            for (
              let l = 0;
              l < rawData[j].bikeModelList[k].Variants.length;
              l++
            ) {
              const variantdata = new twowheelerVariants({
                variantName: rawData[j].bikeModelList[k].Variants[l].Name,
                photourl: rawData[j].bikeModelList[k].photourl,
                modelId: resultmodeldata._id,
              });
              await variantdata.save();
            }
          }
          //electric-scooter
          if (
            rawData[j].electricscootermodelList &&
            0 < rawData[j].electricscootermodelList.length
          ) {
            for (
              let k = 0;
              k < rawData[j].electricscootermodelList.length;
              k++
            ) {
              const ismodelpresent = await TwowheelerModels.findOne({
                modelName: rawData[j].electricscootermodelList[k].Name,
              });
              if (ismodelpresent) {
                continue;
              }
              const modeldata = new TwowheelerModels({
                modelName: rawData[j].electricscootermodelList[k].Name,
                brandId: _id,
              });
              const resultmodeldata = await modeldata.save();
              for (
                let l = 0;
                l < rawData[j].electricscootermodelList[k].Variants.length;
                l++
              ) {
                const variantdata = new twowheelerVariants({
                  variantName:
                    rawData[j].electricscootermodelList[k].Variants[l].Name,
                  photourl: rawData[j].electricscootermodelList[k].photourl,
                  modelId: resultmodeldata._id,
                });
                await variantdata.save();
              }
            }
          }
          //scootermodelList
          if (
            rawData[j].scootermodelList &&
            0 < rawData[j].scootermodelList.length
          ) {
            for (let k = 0; k < rawData[j].scootermodelList.length; k++) {
              const ismodelpresent = await TwowheelerModels.findOne({
                modelName: rawData[j].scootermodelList[k].Name,
              });
              if (ismodelpresent) {
                continue;
              }
              const modeldata = new TwowheelerModels({
                modelName: rawData[j].scootermodelList[k].Name,
                brandId: _id,
              });
              const resultmodeldata = await modeldata.save();
              for (
                let l = 0;
                l < rawData[j].scootermodelList[k].Variants.length;
                l++
              ) {
                const variantdata = new twowheelerVariants({
                  variantName: rawData[j].scootermodelList[k].Variants[l].Name,
                  photourl: rawData[j].scootermodelList[k].photourl,
                  modelId: resultmodeldata._id,
                });
                await variantdata.save();
              }
            }
          }
          break;
        }
      }
    }
    res.status(200).json({
      status: "Ok",
      message: "success",
      data: brandresult,
    });
  } catch (err) {
    res.status(401).json({ status: "Failed", message: err.message });
  }
});
module.exports = dummydataRouter;
