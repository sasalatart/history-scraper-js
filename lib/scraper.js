const cheerio = require('cheerio');

const CITATION_REGEX = /\[citation needed\]|\[\d+\]/gi;

function scrapDescription($) {
  const filterFunction = (i, element) => {
    const text = $(element).text();
    return text && text.slice(-1) !== ':';
  };

  return $('#mw-content-text > div > p')
    .filter(filterFunction)
    .map((i, element) => $(element).text())
    .get()
    .join('\n')
    .replace(CITATION_REGEX, '');
}

function scrapKeywords($, kw) {
  const elementNode = $(kw);
  const title = elementNode.attr('title');
  const href = elementNode.attr('href');

  if (!title || !href) {
    return undefined;
  }

  return { title, href };
}

function scrapEpisodes($, type) {
  const mapFunction = (i, element) => {
    const elementNode = $(element);

    const [year, ...data] = elementNode
      .text()
      .split(' – ');

    const dataString = data.join(' – ');

    const kw = elementNode
      .children('a')
      .map((j, keyword) => scrapKeywords($, keyword))
      .get();

    if (!year || !dataString) {
      return undefined;
    }

    return {
      year: year.replace(/\D/g, ''),
      isBCE: year.includes('BC') || year.includes('B.C'),
      data: dataString.replace(CITATION_REGEX, ''),
      kw,
    };
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

  return {
    description: scrapDescription($),
    events: scrapEpisodes($, 'Events'),
    births: scrapEpisodes($, 'Births'),
    deaths: scrapEpisodes($, 'Deaths')
  };
};
