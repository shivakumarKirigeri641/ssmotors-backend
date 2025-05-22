const PartsAndAccessoryStructure = require("../../models/servicesInformation/partsAndAccessoryStructure");
const getRandomBikeItem = () => {
  const bikeNames = [
    "Speedster",
    "RoadRunner",
    "MountainMaster",
    "CityCruiser",
    "EcoRider",
  ];
  const descriptions = [
    "A high-performance bike perfect for long road trips.",
    "Lightweight and ideal for city commutes.",
    "Built for tough terrains and mountain trails.",
    "Smooth and comfortable ride for everyday use.",
    "Eco-friendly and efficient urban transport.",
  ];

  const randomIndex = Math.floor(Math.random() * bikeNames.length);
  const price = parseFloat((Math.random() * 50000 + 10000).toFixed(2)); // Between 10,000 and 60,000
  const stateTax = parseFloat((price * 0.08).toFixed(2)); // 8% state tax
  const centralTax = parseFloat((price * 0.12).toFixed(2)); // 12% central tax

  return new PartsAndAccessoryStructure({
    itemName: bikeNames[randomIndex],
    itemDescription: descriptions[randomIndex],
    price: price,
    stateTax: stateTax,
    centralTax: centralTax,
  });
};
module.exports = getRandomBikeItem;
