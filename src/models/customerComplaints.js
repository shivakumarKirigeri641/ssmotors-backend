const { default: mongoose } = require("mongoose");
const itemDataSchema = require("./itemDataSchema");
const customerComplaintsSchema = mongoose.Schema({
  serviceDataId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  list: {
    type: [itemDataSchema],
  },
});
const customerComplaints = mongoose.model(
  "customerComplaints",
  customerComplaintsSchema
);
module.exports = customerComplaints;
