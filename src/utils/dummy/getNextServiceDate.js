const getNextServiceDate = () => {
  const today = new Date();
  const monthsToAdd = Math.random() < 0.5 ? 2 : 4;

  const futureDate = new Date(today.setMonth(today.getMonth() + monthsToAdd));
  return futureDate;
};
module.exports = getNextServiceDate;
