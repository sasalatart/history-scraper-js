const Day = require('./lib/day');
const { createRawDays, prepareOutput } = require('./lib/utils');

function scraper(opts = {}) {
  const { delay, outputDir, logging } = opts;
  const msDelay = delay || 50;

  const RAW_DAYS = createRawDays();
  const episodes = [];

  if (logging) {
    console.log(`Scraper starting with a delay of ${msDelay}ms between requests.`);
  }

  RAW_DAYS.forEach((date, index) => {
    setTimeout(() => {
      episodes.push(new Day(date.day, date.month, logging));
    }, index * msDelay);
  });

  return new Promise((res, rej) => {
    setTimeout(() => {
      Promise.all(episodes)
        .then(jsonArray => prepareOutput(res, rej, outputDir, jsonArray, logging))
        .catch(rej);
    }, RAW_DAYS.length * msDelay);
  });
}

module.exports = scraper;
