const getRandomPhoneNumber = () => {
  const firstDigit = Math.floor(Math.random() * 4) + 6; // 6 to 9
  let number = firstDigit.toString();

  for (let i = 0; i < 9; i++) {
    number += Math.floor(Math.random() * 10);
  }

  return number;
};
module.exports = getRandomPhoneNumber;
