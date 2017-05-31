const Day = require('./lib/day');
const { createRawDays, writeOutput } = require('./lib/utils');

function scraper(outputDir = 'data.json', delay = 50) {
  const RAW_DAYS = createRawDays();
  const episodes = [];
  RAW_DAYS.forEach(({ day, month }, index) => {
    setTimeout(() => episodes.push(new Day(day, month)), index * delay);
  });

  return new Promise((res, rej) => {
    setTimeout(() => {
      Promise.all(episodes)
        .then(outputArray => writeOutput(res, outputDir, outputArray))
        .catch(rej);
    }, RAW_DAYS.length * delay);
  });
}

module.exports = scraper;
