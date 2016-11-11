let   fs                = require('fs'),
      url               = require('url'),
      path              = require('path'),
      scraper           = require('website-scraper'),
      processPage       = require('./processPage'),
      geminiTestBuilder = require('./geminiTestBuilder'),
      Q                 = require('q'),
      util              = require('util'),
      Storage           = require('./Storage'),
      showResults       = require('./showResults');

let storage = new Storage();

let scrapOptions = {
  subdirectories: [
    {directory: 'img', extensions: ['.jpg', '.png', '.svg', '.gif']},
    {directory: 'js', extensions: ['.js']},
    {directory: 'fonts', extensions: ['.ttf', '.otf', '.woff', '.eot']},
    {directory: 'css', extensions: ['.css']}
  ],
  sources: [
    {selector: 'img', attr: 'src'},
    {selector: 'link[rel="stylesheet"]', attr: 'href'},
    {selector: 'script', attr: 'src'}
  ],
};

function sanitizeHtml(html) {
  let result = '',
      regexp = new RegExp('crossorigin="anonymous"', 'g');

  result = html.replace(regexp, '');
  result = result.trim();
  result = result.substring(0, result.length - 7) + `
    <style>
      * {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        transition: none !important;
        -webkit-animation: none !important;
        -moz-animation: none !important;
        -o-animation: none !important;
        animation: none !important;
      }
    </style>
  </html>
  `;

  return result;
}

function downloadPage(page) {
  let siteStorage = storage.add(page).site(page.name);

  scrapOptions.urls = siteStorage.url;
  scrapOptions.directory = siteStorage.paths.root;

  let deferred = Q.defer();
  scraper.scrape(scrapOptions, (err, result) => {
    if (err) throw err;
    console.log("Downloading", siteStorage.name, '...');

    let html = sanitizeHtml(result[0].text);
    fs.writeFileSync(path.join(siteStorage.paths.root, 'index.html'), html, 'utf-8');

    siteStorage.assets.styles = fs.readdirSync(path.join(siteStorage.paths.root, 'css')); //TODO: fix this

    deferred.resolve();
  })

  return deferred.promise.then(() => { return processPage(siteStorage); });
}

module.exports = (config) => {
  console.log('\n\n');

  let pages = config.pages

  let promise = Q();
  pages.forEach((page, i) => {
    promise = promise.then((v) => {
      let promise;

      promise = downloadPage(page);

      return promise
    });
  });

  promise
    .then(() => {
      return geminiTestBuilder('pre', storage);
    })
    .then(() => {
      return geminiTestBuilder('post', storage);
    })
    .then(() => {
      return showResults(storage);
    })
    .catch((err) => {
      console.log('FATAL'.red, err);
    })
    .done();
}
