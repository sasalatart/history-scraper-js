# History Scraper (JS)

[![npm version](https://badge.fury.io/js/history-scraper.svg)](https://badge.fury.io/js/history-scraper)
[![Code Climate](https://codeclimate.com/github/sasalatart/history-scraper-js/badges/gpa.svg)](https://codeclimate.com/github/sasalatart/history-scraper-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## About

Scraper that searches for events, births and deaths that occurred during a specific day of history from Wikipedia.

You may check out the ruby gem version [here](https://github.com/sasalatart/history-scraper-rb).

## Usage

1. Run `npm i history-scraper` or `yarn add history-scraper`

2. Add this to your code:

  ```js
  const scraper = require('history-scraper');

  scraper(optionsJson)
    .then(json => console.log(json))
    .catch(err => console.error(err));
  ```

3. Run your code.

`optionsJson` may have the following key/values:

| key       | description                                     | example value | default value                  |
|-----------|-------------------------------------------------|---------------|--------------------------------|
| delay     | ms delay between successive requests            | 200           | 50                             |
| outputDir | name of the file to write the results           | data.json     | none (no file will be written) |
| logging   | whether to show the algorithm's progress or not | true          | false                          |

  example options:
  ```js
  { delay: 50, outputDir: 'data.json', logging: true }
  ```

## Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'add my feature'`)
4. Push to your feature branch (`git push origin my-new-feature`)
5. Create a new Pull Request
