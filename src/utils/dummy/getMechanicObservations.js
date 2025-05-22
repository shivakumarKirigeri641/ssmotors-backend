const getRandomNumber = require("./getRandomNumber");
const getMechanicObservations = (count) => {
  let array = [
    "Engine oil is dirty and needs replacement.",

    "Spark plug is worn out; recommend replacement.",

    "Engine noise slightly high – may require valve adjustment.",

    "Minor oil leakage detected near the crankcase.",

    "Rear tyre tread worn out – nearing replacement.",

    "Front tyre slightly under-inflated.",

    "Wheel alignment slightly off; recommended correction.",

    "Small crack observed on rear rim.",
    "Front disc brake pads are worn out – recommend immediate replacement.",

    "Rear drum brake is too loose.",

    "Brake fluid level is low.",

    "Squeaking sound from front brake pads.",
    "Headlight low beam not working.",

    "Horn sound is weak – may be battery issue.",

    "Battery voltage slightly low – suggest monitoring.",

    "Indicator bulbs flickering.",
    "Front suspension hard – may need oil refill or fork repair.",

    "Rear shock absorbers functioning fine.",

    "Minor rust on footrest mount and chassis joints.",

    "Handlebar alignment slightly off-center.",
    "Bike frame has scratches on left side.",

    "Side stand spring is loose.",

    "Mudguard has crack near mounting point.",

    "Air filter dirty – recommend cleaning or replacement.",

    "Bike requires full-body wash and polish.",
  ];
  let newarray = [];
  for (let i = 0; i < count; i++) {
    newarray.push(array[getRandomNumber(0, count)]);
  }
  return newarray;
};
module.exports = getMechanicObservations;
