# On This Day Scraper (JS)

[![npm version](https://badge.fury.io/js/on-this-day-scraper.svg)](https://badge.fury.io/js/on-this-day-scraper)
[![Code Climate](https://codeclimate.com/github/sasalatart/on-this-day-scraper-js/badges/gpa.svg)](https://codeclimate.com/github/sasalatart/on-this-day-scraper-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## About

*On This Day* is a scraper that searches events, births and deaths that occurred in a specific day from Wikipedia.

You may check out the ruby gem version [here](https://github.com/sasalatart/on-this-day-scraper-rb).

## Usage

1. Run `npm i on-this-day-scraper` or `yarn add on-this-day-scraper`

2. Add this to your code:

  ```js
    const scraper = require('on-this-day-scraper');

    scraper('outputFileName.json', msDelayBetweenRequests)
      .then(json => console.log(json))
      .catch(err => console.error(err));
  ```

  If not specified, by default the output file name will be `data.json`, and the delay between successive requests will be 50ms.

## Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'add my feature'`)
4. Push to your feature branch (`git push origin my-new-feature`)
5. Create a new Pull Request
