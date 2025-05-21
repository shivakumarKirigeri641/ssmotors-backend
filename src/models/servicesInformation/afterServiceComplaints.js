const mongoose = require("mongoose");
const AfterServiceComplaintsStruture = require("../servicesInformation/afterServiceComplaintsStruture");
const afterServiceComplaintsSchema = mongoose.Schema({
  serviceDataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceData",
    required: true,
  },
  complaints: {
    type: [AfterServiceComplaintsStruture.Schema],
  },
});
const AfterServiceComplaints = mongoose.model(
  "AfterServiceComplaints",
  afterServiceComplaintsSchema
);
module.exports = AfterServiceComplaints;
