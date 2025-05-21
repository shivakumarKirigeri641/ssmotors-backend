const mongoose = require("mongoose");
const customerComplaintsSchema = mongoose.Schema({
  serviceDataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceData",
    required: true,
  },
  complaints: {
    type: [String],
  },
});
const CustomerComplaints = mongoose.model(
  "CustomerComplaints",
  customerComplaintsSchema
);
module.exports = CustomerComplaints;
