const mongoose = require("mongoose");
const itemDataSchema = require("./itemDataSchema");
const standardServicesCheckListSchema = mongoose.Schema(
  {
    list: {
      type: [itemDataSchema],
    },
  },
  {
    timestamps: true,
  }
);
const StandardServicesCheckList = mongoose.model(
  "StandardServicesCheckList",
  standardServicesCheckListSchema
);
module.exports = StandardServicesCheckList;
