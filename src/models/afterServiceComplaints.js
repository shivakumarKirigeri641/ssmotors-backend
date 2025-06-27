const { default: mongoose } = require("mongoose");
const itemDataSchema = require("./itemDataSchema");
const afterServiceComplaintsSchema = mongoose.Schema({
  serviceDataId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  list: {
    type: [itemDataSchema],
  },
});
const afterServiceComplaints = mongoose.model(
  "afterServiceComplaints",
  afterServiceComplaintsSchema
);
module.exports = afterServiceComplaints;
