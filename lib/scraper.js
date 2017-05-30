const cheerio = require('cheerio');

function scrapDescription($) {
  const cleanup = (i, element) => {
    const text = $(element).text();
    return text !== '' && text.slice(-1) !== ':';
  };

  return $('#mw-content-text > p')
           .filter(cleanup)
           .map((i, element) => $(element).text())
           .get()
           .join('\n');
}

module.exports = (body) => {
  const $ = cheerio.load(body);
  const description = scrapDescription($);
  return { description };
};
