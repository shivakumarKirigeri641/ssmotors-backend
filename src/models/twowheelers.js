const mongoose = require("mongoose");
const validator = require("validator");
const twowheelersSchema = mongoose.Schema({
  Name: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  logourl: {
    type: String,
    unique: true,
    required: true,
    default:
      "https://e7.pngegg.com/pngimages/873/949/png-clipart-bicycle-orbea-mountain-bike-cycling-29er-cyclist-logo-white-text-thumbnail.png",
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Invalid url!");
      }
    },
  },
  modelslink: {
    type: String,
    unique: true,
    required: true,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Invalid url!");
      }
    },
  },
  BikeModelList: {
    type: [
      {
        Name: {
          type: String,
          unique: true,
          required: true,
          minLength: 3,
          maxLength: 50,
        },
        bikeurl: {
          type: String,
          unique: true,
          required: true,
          validate(value) {
            if (!validator.isURL(value)) {
              throw new Error("Invalid url!");
            }
          },
        },
        Variants: {
          type: [
            {
              Name: {
                type: String,
                unique: true,
                required: true,
                minLength: 3,
                maxLength: 50,
              },
              photourl: {
                type: String,
                unique: true,
                required: true,
                validate(value) {
                  if (!validator.isURL(value)) {
                    throw new Error("Invalid url!");
                  }
                },
              },
            },
          ],
        },
      },
    ],
  },
  ElectricScootermodelList: {
    type: [
      {
        Name: {
          type: String,
          unique: true,
          required: true,
          minLength: 3,
          maxLength: 50,
        },
        bikeurl: {
          type: String,
          unique: true,
          required: true,
          validate(value) {
            if (!validator.isURL(value)) {
              throw new Error("Invalid url!");
            }
          },
        },
        Variants: {
          type: [
            {
              Name: {
                type: String,
                unique: true,
                required: true,
                minLength: 3,
                maxLength: 50,
              },
              photourl: {
                type: String,
                unique: true,
                required: true,
                validate(value) {
                  if (!validator.isURL(value)) {
                    throw new Error("Invalid url!");
                  }
                },
              },
            },
          ],
        },
      },
    ],
  },
  ScootermodelList: {
    type: [
      {
        Name: {
          type: String,
          unique: true,
          required: true,
          minLength: 3,
          maxLength: 50,
        },
        bikeurl: {
          type: String,
          unique: true,
          required: true,
          validate(value) {
            if (!validator.isURL(value)) {
              throw new Error("Invalid url!");
            }
          },
        },
        Variants: {
          type: [
            {
              Name: {
                type: String,
                unique: true,
                required: true,
                minLength: 3,
                maxLength: 50,
              },
              photourl: {
                type: String,
                unique: true,
                required: true,
                validate(value) {
                  if (!validator.isURL(value)) {
                    throw new Error("Invalid url!");
                  }
                },
              },
            },
          ],
        },
      },
    ],
  },
});
const Twowheeler = mongoose.model("Twowheeler", twowheelersSchema);
module.exports = Twowheeler;
