const express = require("express");
const getRandomNumber = require("../utils/dummy/getRandomNumber");
const dummydataRouter = express.Router();
dummydataRouter.post("/temp", async (req, res) => {
  try {
    let arrayOfTwoWheelers = [];
    let dayindex = 0;
    const startDate = new Date("2023-01-01");
    const today = new Date();

    while (startDate <= today) {
      //const countOfTwoWheelers = getRandomNumber(8, 18);
      //for (let i = 0; i < countOfTwoWheelers; i++) {}
      startDate.setDate(startDate.getDate() + 1);
    }

    res.status(200).json({ status: "Ok", message: "success", data });
  } catch (err) {
    res.status(401).json({ status: "Failed", message: err.message });
  }
});
module.exports = dummydataRouter;
