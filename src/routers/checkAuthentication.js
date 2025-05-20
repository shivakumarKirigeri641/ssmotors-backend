const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
require("dotenv").config();
const checkAuthentication = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Session expired!");
    }
    const result = await jwt.verify(token, process.env.SECRET_KEY);
    if (!result) {
      throw new Error("Session expired!");
    }
    const admindata = await Admin.findById(result._id);
    if (admindata._id.toString() !== result._id.toString()) {
      throw new Error("Invalid token. Please re-login!");
    }
    req.admindata = admindata;
    next();
  } catch (err) {
    res.status(401).json({
      status: "Faidddled",
      message: err.message,
    });
  }
};
module.exports = checkAuthentication;
