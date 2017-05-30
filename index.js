const Day = require('./lib/day');

new Day(31, 12)
  .then(info => console.log(info))
  .catch(err => console.log(err));
