const cheerio = require('cheerio');

function scrapDescription($) {
  const filterFunction = (i, element) => {
    const text = $(element).text();
    return text !== '' && text.slice(-1) !== ':';
  };

  return $('#mw-content-text > div > p')
    .filter(filterFunction)
    .map((i, element) => $(element).text())
    .get()
    .join('\n');
}

function scrapKeywords($, kw) {
  const elementNode = $(kw);
  const title = elementNode.attr('title');
  const href = elementNode.attr('href');

  if (title && href) {
    return { title, href };
  }
  return undefined;
}

function scrapEpisodes($, type) {
  const mapFunction = (i, element) => {
    const elementNode = $(element);

    let [year, ...data] = elementNode
      .text()
      .split(' – ');

    data = data.join(' – ');

    const kw = elementNode
      .children('a')
      .map((j, keyword) => scrapKeywords($, keyword))
      .get();

    if (year && data && data !== '') {
      return { year, data, kw };
    }
    return undefined;
  };

  return $(`#${type}`)
    .parent()
    .next()
    .children('li')
    .map(mapFunction)
    .filter(episode => episode !== undefined)
    .get();
}

module.exports = (body) => {
  const $ = cheerio.load(body);

  const description = scrapDescription($);
  const events = scrapEpisodes($, 'Events');
  const births = scrapEpisodes($, 'Births');
  const deaths = scrapEpisodes($, 'Deaths');

  return { description, events, births, deaths };
};
