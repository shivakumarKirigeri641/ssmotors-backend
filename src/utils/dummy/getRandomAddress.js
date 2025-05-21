const getRandomAddress = () => {
  const streets = [
    "MG Road",
    "Brigade Road",
    "Linking Road",
    "Park Street",
    "Anna Salai",
    "VIP Road",
    "Lajpat Nagar",
    "BTM Layout",
  ];
  const states = [
    "Maharashtra",
    "Karnataka",
    "Tamil Nadu",
    "West Bengal",
    "Delhi",
    "Telangana",
    "Uttar Pradesh",
    "Rajasthan",
    "Gujarat",
  ];
  const pinCodes = [
    "560001",
    "400001",
    "110001",
    "700001",
    "600001",
    "500001",
    "302001",
    "380001",
    "208001",
  ];

  const street = streets[Math.floor(Math.random() * streets.length)];
  const city = "Bangalore";
  const state = states[Math.floor(Math.random() * states.length)];
  const pin = pinCodes[Math.floor(Math.random() * pinCodes.length)];
  const houseNumber = Math.floor(Math.random() * 200) + 1;

  return `House No. ${houseNumber}, ${street}, ${city}, ${state} - ${pin}`;
};
module.exports = getRandomAddress;
