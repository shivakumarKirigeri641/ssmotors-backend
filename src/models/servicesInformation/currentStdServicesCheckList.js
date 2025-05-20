const mongoose = require("mongoose");
const currentStdServicesCheckListSchema = mongoose.Schema({
  serviceDataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceData",
    required: true,
  },
  serviceList: {
    type: [String],
  },
  otherServiceComment: {
    type: String,
    default: "",
  },
});
const CurrentStdServicesCheckList = mongoose.model(
  "CurrentStdServicesCheckList",
  currentStdServicesCheckListSchema
);
module.exports = CurrentStdServicesCheckList;
