const Admin = require("../models/admin");
const argon2 = require("argon2");
const validateAdminLogin = async (req) => {
  try {
    const { email, password } = req.body;
    const result = await Admin.findOne({ email });
    if (!result) {
      throw new Error("Invalid credentials!");
    }
    const isvalidpassword = await argon2.verify(result.password, password);
    if (!isvalidpassword) {
      throw new Error("Invalid credentials!!");
    }
    req.admindata = result;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = validateAdminLogin;
