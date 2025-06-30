const { default: mongoose } = require("mongoose");
const itemDataSchema = require("./itemDataSchema");
const servicePaymentsSchema = mongoose.Schema(
  {
    list: {
      type: [itemDataSchema],
    },
  },
  {
    timestamps: true,
  }
);
const servicePayments = mongoose.model(
  "servicePayments",
  servicePaymentsSchema
);
module.exports = servicePayments;
