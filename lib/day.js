const ProgressBar = require('progress');
const request = require('request-promise');
const scraper = require('./scraper');

const progressBar = new ProgressBar('[:bar] :percent', { total: 365, width: 50, incomplete: '.', head: '>' });

class Day {
  constructor(day, month, logging) {
    this.day = day;
    this.month = month;

    return new Promise((resolve, reject) => {
      request(`https://en.wikipedia.org/wiki/${this.month}_${this.day}`)
        .then(body => {
          if (logging) {
            progressBar.tick();
          }
          resolve(this.buildJson(body))
        })
        .catch(reject);
    });
  }

  buildJson(body) {
    const jsonResult = {};
    jsonResult[`${this.month}-${this.day}`] = scraper(body);
    return jsonResult;
  }
}

module.exports = Day;
