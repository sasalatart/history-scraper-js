const Day = require('./lib/day');
const { createRawDays, prepareOutput } = require('./lib/utils');

function scraper(opts = {}) {
  const { delay, outputDir, logging } = opts;
  const msDelay = delay || 50;

  if (logging) {
    console.log(`Scraper starting with a delay of ${msDelay}ms between requests.`);
  }

  const dates = createRawDays()
    .map((date, index) => new Day(date.day, date.month, delay*index, logging));

  return Promise.all(dates)
    .then(jsonArray => prepareOutput(outputDir, jsonArray, logging));
}

module.exports = scraper;
