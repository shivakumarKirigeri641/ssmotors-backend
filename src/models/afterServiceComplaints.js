const mongoose = require("mongoose");
const itemDataSchema = require("./itemDataSchema");
const afterServiceComplaintsSchema = mongoose.Schema({
  list: {
    type: [itemDataSchema],
  },
});
const afterServiceComplaints = mongoose.model(
  "afterServiceComplaints",
  afterServiceComplaintsSchema
);
module.exports = afterServiceComplaints;
