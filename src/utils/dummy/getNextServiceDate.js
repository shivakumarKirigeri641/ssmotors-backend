const getNextServiceDate = (currentServiceDate) => {
  const monthsToAdd = Math.random() < 0.5 ? 2 : 3;

  const futureDate = new Date(
    currentServiceDate.setMonth(currentServiceDate.getMonth() + monthsToAdd)
  );
  return futureDate;
};
module.exports = getNextServiceDate;
