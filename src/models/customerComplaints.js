const { default: mongoose } = require("mongoose");
const itemDataSchema = require("./itemDataSchema");
const customerComplaintsSchema = mongoose.Schema({
  list: {
    type: [itemDataSchema],
  },
});
const customerComplaints = mongoose.model(
  "customerComplaints",
  customerComplaintsSchema
);
module.exports = customerComplaints;
