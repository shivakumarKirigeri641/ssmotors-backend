const express = require("express");
const Twowheelers = require("../models/twowheelers");
const checkAuthentication = require("./checkAuthentication");
const twowheelerRouter = express.Router();
//fetch brand
twowheelerRouter.get(
  "/twowheelerbrands",
  checkAuthentication,
  async (req, res) => {
    try {
      const data = await Twowheelers.find({}).select("Name logourl");
      res.status(200).json({
        status: "Ok",
        message: "Profile fetched successfully",
        data,
      });
    } catch (err) {
      res.status(401).json({
        status: "Failed",
        message: err.message,
      });
    }
  }
);
//fetch models by brand-name
twowheelerRouter.get(
  "/twowheeler-models-and-variants",
  checkAuthentication,
  async (req, res) => {
    try {
      const brand = req.body.brandName;
      let data = await Twowheelers.findOne({ Name: brand }).select(
        "Name logourl BikeModelList ElectricScootermodelList ScootermodelList"
      );
      if (!data) {
        throw new Error("Vehicles not found!");
      }
      res.status(200).json({
        status: "Ok",
        message: "Vehicles fetched successfully",
        data,
      });
    } catch (err) {
      res.status(401).json({
        status: "Failed",
        message: err.message,
      });
    }
  }
);
//fetch models by brand-id
twowheelerRouter.get(
  "/twowheeler-models-and-variants/:brandid",
  checkAuthentication,
  async (req, res) => {
    try {
      const brandid = req.params.brandid;
      let data = await Twowheelers.findById(brandid).select(
        "Name logourl BikeModelList ElectricScootermodelList ScootermodelList"
      );
      if (!data) {
        throw new Error("Vehicles not found!");
      }
      res.status(200).json({
        status: "Ok",
        message: "Vehicles fetched successfully",
        data,
      });
    } catch (err) {
      res.status(401).json({
        status: "Failed",
        message: err.message,
      });
    }
  }
);
module.exports = twowheelerRouter;
