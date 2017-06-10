const jsonfile = require('jsonfile');

const months = [
  { month: 1, days: 31 },
  { month: 2, days: 29 },
  { month: 3, days: 31 },
  { month: 4, days: 30 },
  { month: 5, days: 31 },
  { month: 6, days: 30 },
  { month: 7, days: 31 },
  { month: 8, days: 31 },
  { month: 9, days: 30 },
  { month: 10, days: 31 },
  { month: 11, days: 30 },
  { month: 12, days: 31 },
];

module.exports.createRawDays = () => {
  const rawDays = [];
  months.forEach(({ month, days }) => {
    for (let day = 1; day <= days; day += 1) {
      rawDays.push({ day, month });
    }
  });
  return rawDays;
};

module.exports.writeOutput = function writeOutput(res, outputDir, outputArray) {
  const outputJson = {};
  outputArray.forEach((jsonDay) => {
    const key = Object.keys(jsonDay)[0];
    const { description, events, births, deaths } = jsonDay[key];
    outputJson[key] = { description, events, births, deaths };
  });

  jsonfile.writeFile(outputDir, outputJson, (err) => {
    if (err) {
      throw new Error(err);
    } else {
      console.log(`Results written to ${outputDir}.`);
      res(outputJson);
    }
  });
};
