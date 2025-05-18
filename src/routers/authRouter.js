const express = require("express");
const Twowheelers = require("../models/twowheelers");
const authRouter = express.Router();
const validateAdminLogin = require("../validations/validateAdminLogin");
const createJsonToken = require("../utils/createJsonToken");
const checkAuthentication = require("../routers/checkAuthentication");

//garage admin login
authRouter.post("/admin/login", async (req, res) => {
  try {
    await validateAdminLogin(req);
    const token = await createJsonToken(req);
    res.cookie("token", token);
    res.status(200).json({
      status: "Ok",
      message: "Logged in successfully",
      data: req.admindata,
    });
  } catch (err) {
    res.status(401).json({
      status: "Failed",
      message: err.message,
      data: req.admindata,
    });
  }
});
//testing authentication
authRouter.get("/admin/profile", checkAuthentication, async (req, res) => {
  try {
    res.status(200).json({
      status: "Ok",
      message: "Profile fetched successfully",
      data: req.admindata,
    });
  } catch (err) {
    res.status(401).json({
      status: "Failed",
      message: err.message,
    });
  }
});

module.exports = authRouter;
