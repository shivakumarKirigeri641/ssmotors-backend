const getExpectedDeliveryDate = (givendate, addition = 0) => {
  const minDays = 1;
  const maxDays = 5;
  const inputDate = new Date(givendate, (addition = 0));
  const randomDays =
    Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays + addition;
  inputDate.setDate(inputDate.getDate() + randomDays);
  return inputDate;
};
module.exports = getExpectedDeliveryDate;
