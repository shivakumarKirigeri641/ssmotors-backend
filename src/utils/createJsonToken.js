const jwt = require("jsonwebtoken");
require("dotenv").config();
const createJsonToken = async (req) => {
  const token = await jwt.sign(
    { _id: req.admindata._id },
    process.env.SECRET_KEY,
    { expiresIn: "30s" }
  );
  return token;
};
module.exports = createJsonToken;
