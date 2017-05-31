const cheerio = require('cheerio');

function scrapDescription($) {
  const filterFunction = (i, element) => {
    const text = $(element).text();
    return text !== '' && text.slice(-1) !== ':';
  };

  return $('#mw-content-text > p')
           .filter(filterFunction)
           .map((i, element) => $(element).text())
           .get()
           .join('\n');
}

function scrapKeywords($, kw) {
  const elementNode = $(kw);
  return { title: elementNode.attr('title'), href: elementNode.attr('href') };
}

function scrapEpisodes($, type) {
  const mapFunction = (i, element) => {
    const elementNode = $(element);

    const [year, ...data] = elementNode
                              .text()
                              .split(' – ');

    const keywords = elementNode
                       .children('a')
                       .map((j, kw) => scrapKeywords($, kw))
                       .get();

    return { year, data: data.join(' – '), keywords };
  };

  return $(`#${type}`)
    .parent()
    .next()
    .children('li')
    .map(mapFunction)
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
