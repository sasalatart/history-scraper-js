const request = require('request-promise');
const scraper = require('./scraper');

const monthNames = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

class Day {
  constructor(day, month) {
    this.day = day;
    this.month = monthNames[month];

    return new Promise((resolve, reject) => {
      console.log(`Scraping ${this.month}-${this.day}`);
      request(`https://en.wikipedia.org/wiki/${this.month}_${this.day}`)
        .then(body => resolve(this.buildJson(body)))
        .catch(err => reject(err));
    });
  }

  buildJson(body) {
    const jsonResult = {};
    jsonResult[`${this.month}-${this.day}`] = scraper(body);
    return jsonResult;
  }
}

module.exports = Day;
