const jsonfile = require('jsonfile');

const months = [
  { month: 'January', days: 31 },
  { month: 'February', days: 29 },
  { month: 'March', days: 31 },
  { month: 'April', days: 30 },
  { month: 'May', days: 31 },
  { month: 'June', days: 30 },
  { month: 'July', days: 31 },
  { month: 'August', days: 31 },
  { month: 'September', days: 30 },
  { month: 'October', days: 31 },
  { month: 'November', days: 30 },
  { month: 'December', days: 31 },
];

function createRawDays() {
  const rawDays = [];
  months.forEach(({ month, days }) => {
    for (let day = 1; day <= days; day += 1) {
      rawDays.push({ day, month });
    }
  });
  return rawDays;
};

function prepareOutput(outputDir, jsonArray, logging) {
  const outputJson = jsonArray.reduce((acc, jsonDay) => Object.assign({}, acc, jsonDay));

  if (outputDir) {
    jsonfile.writeFileSync(outputDir, outputJson);

    if (logging) {
      console.log(`Results written to ${outputDir}.`);
    }
  }

  return Promise.resolve(outputJson);
};

module.exports.createRawDays = createRawDays;
module.exports.prepareOutput = prepareOutput;
