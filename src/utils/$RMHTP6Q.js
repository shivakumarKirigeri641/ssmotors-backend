const mongoose = require("mongoose");
const twowheelerpartsdetailsSchema = mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  itemDescription: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    min: 0,
    max: 100000,
    default: 0,
  },
  cTax: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  sTax: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
});
const standardCheckSchema = mongoose.Schema({
  checkTitle: {
    type: String,
    required: true,
  },
  checkDescriptions: {
    type: [String],
    required: true,
  },
  isChecked: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const serviceCostDetailsSchema = mongoose.Schema({
  serviceTypeName: {
    type: String,
  },
  serviceTypeDescription: {
    type: String,
  },
  amount: {
    type: Number,
    min: 0,
    default: 0,
    max: 100000,
  },
  cTax: {
    type: Number,
    min: 0,
    default: 18,
    max: 100,
  },
  sTax: {
    type: Number,
    min: 0,
    default: 18,
    max: 100,
  },
});
const vehicleInspectionCheckSchema = mongoose.Schema({
  checkName: {
    type: String,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
});
const complaintElementSchema = mongoose.Schema({
  complaintType: {
    type: String,
    default: "bike",
  },
  complaintDescription: {
    type: String,
  },
  isResolved: {
    type: Boolean,
    default: false,
  },
  resolution: {
    type: String,
    default: "",
  },
  isAmountPayable: {
    type: Boolean,
    default: false,
  },
  amount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100000,
  },
});
const serviceDataNewScehma = mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "VehicleData",
  },
  serviceList: {
    type: [
      {
        kmDrivenBeforeServicing: {
          type: Number,
          min: 1000,
          max: 9999999,
          default: 1000,
          required: true,
        },
        serviceInDateTime: {
          type: Date,
        },
        serviceOutDateTime: {
          type: Date,
        },
        serviceSequenceNumber: {
          type: Number,
          required: true,
        },
        serviceStatus: {
          type: Number,
          required: true,
          unique: true,
        },
        afterServiceComplaints: {
          type: [complaintElementSchema],
        },
        mechanicObservations: {
          type: [complaintElementSchema],
        },
        customerComplaints: {
          type: [complaintElementSchema],
        },
        currentStandardCheckLists: {
          type: [standardCheckSchema],
        },
        currentVehicleInspectionCheckLists: {
          type: [vehicleInspectionCheckSchema],
        },
        nextServiceDetails: {
          kmForNextService: {
            type: Number,
            required: true,
            default: 0,
          },
          dateForNextService: {
            type: Date,
            required: true,
            default: new Date(),
          },
        },
        serviceCostList: {
          type: [serviceCostDetailsSchema],
        },
        partsAndAccessories: {
          type: [twowheelerpartsdetailsSchema],
        },
      },
    ],
  },
});
const serviceDataNew = mongoose.model("ServiceDataNew", serviceDataNewScehma);
module.exports = serviceDataNew;
