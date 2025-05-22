const getNextServiceDate = (currentServiceDate) => {
  const tempdate = new Date(currentServiceDate);
  const monthsToAdd = Math.random() < 0.5 ? 2 : 3;

  const futureDate = new Date(
    tempdate.setMonth(tempdate.getMonth() + monthsToAdd)
  );
  return futureDate;
};
module.exports = getNextServiceDate;
