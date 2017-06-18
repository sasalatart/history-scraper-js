const ProgressBar = require('progress');
const request = require('request-promise');
const scraper = require('./scraper');

const PROGRESS_OPTIONS = { total: 365, width: 50, incomplete: '.', head: '>' };
const progressBar = new ProgressBar('[:bar] :percent', PROGRESS_OPTIONS);

class Day {
  constructor(day, month, delay, logging) {
    this.day = day;
    this.month = month;

    return this.buildPromise(delay, logging);
  }

  buildPromise(delay, logging) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        request(`https://en.wikipedia.org/wiki/${this.month}_${this.day}`)
          .then(body => res(this.buildJson(body, logging)))
          .catch(rej);
      }, delay);
    });
  }

  buildJson(body, logging) {
    if (logging) {
      progressBar.tick();
    }

    return { [`${this.month}-${this.day}`]: scraper(body) };
  }
}

module.exports = Day;
