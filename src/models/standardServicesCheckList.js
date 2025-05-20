const mongoose = require("mongoose");
const standardServicesCheckListSchema = mongoose.Schema({
  serviceName: {
    type: String,
    unique: true,
    minLength: 3,
    maxLength: 30,
    required: true,
  },
  serviceLists: {
    type: [String],
    required: true,
  },
});
const StandardServicesCheckList = mongoose.model(
  "StandardServicesCheckList",
  standardServicesCheckListSchema
);
module.exports = StandardServicesCheckList;
