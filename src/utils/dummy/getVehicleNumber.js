const getVehicleNumber = () => {
  const rtoCodes = Array.from({ length: 35 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  ); // KA01 to KA35
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const stateCode = "KA";
  const rtoCode = rtoCodes[Math.floor(Math.random() * rtoCodes.length)];
  const randomLetters =
    letters.charAt(Math.floor(Math.random() * 26)) +
    letters.charAt(Math.floor(Math.random() * 26));
  const number = String(Math.floor(Math.random() * 9999) + 1).padStart(4, "0");

  return `${stateCode}${rtoCode}${randomLetters}${number}`;
};
module.exports = getVehicleNumber;
