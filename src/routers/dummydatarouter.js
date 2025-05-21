const express = require("express");
const getRandomNumber = require("../utils/dummy/getRandomNumber");
const getCustomerData = require("../utils/dummy/getCustomerData");
const getVehicleData = require("../utils/dummy/getVehicleData");
const dummydataRouter = express.Router();
dummydataRouter.post("/temp", async (req, res) => {
  try {
    let arrayOfTwoWheelers = [];
    let dayindex = 0;
    const startDate = new Date("2023-01-01");
    const today = new Date();
    let bikeArray = [];
    while (startDate <= today) {
      for (let i = 0; i < 301; i++) {
        const vehicleData = await getVehicleData();
        bikeArray.push({
          owner: getCustomerData(vehicleData.vairantId),
          registration: vehicleData.vehicleNumber,
          serviceDate: startDate,
          kmDrivenBeforeService: getRandomNumber(2000, 3000),
        });
        startDate.setDate(startDate.getDate() + 1);
      }
      break;
    }

    //now got full vehicle details list of 300 count

    res.status(200).json({ status: "Ok", message: "success", data: bikeArray });
  } catch (err) {
    res.status(401).json({ status: "Failed", message: err.message });
  }
});
module.exports = dummydataRouter;
