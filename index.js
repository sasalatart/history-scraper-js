const Day = require('./lib/day');
const { createRawDays, writeOutput } = require('./lib/utils');

const RAW_DAYS = createRawDays();
const OUTPUT_DIR = 'data.json';
const DELAY = 50;

const episodes = [];
RAW_DAYS.forEach(({ day, month }, index) => {
  setTimeout(() => episodes.push(new Day(day, month)), index * DELAY);
});

setTimeout(() => {
  Promise.all(episodes)
    .then(outputArray => writeOutput(OUTPUT_DIR, outputArray))
    .catch(err => console.log(err));
}, RAW_DAYS.length * DELAY);
