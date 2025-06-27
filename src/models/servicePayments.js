const { default: mongoose } = require("mongoose");
const itemDataSchema = require("./itemDataSchema");
const servicePaymentsSchema = mongoose.Schema({
  serviceDataId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  list: {
    type: [itemDataSchema],
  },
});
const servicePayments = mongoose.model(
  "servicePayments",
  servicePaymentsSchema
);
module.exports = servicePayments;
