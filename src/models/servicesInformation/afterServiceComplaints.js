const mongoose = require("mongoose");
const afterServiceComplaintsSchema = mongoose.Schema({
  serviceDataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceData",
    required: true,
  },
  complaints: {
    type: [String],
  },
});
const AfterServiceComplaints = mongoose.model(
  "AfterServiceComplaints",
  afterServiceComplaintsSchema
);
module.exports = AfterServiceComplaints;
