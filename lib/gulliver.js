let   fs                = require('fs'),
      url               = require('url'),
      path              = require('path'),
      scraper           = require('website-scraper'),
      processPage       = require('./processPage'),
      geminiTestBuilder = require('./geminiTestBuilder'),
      Q                 = require('q'),
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

module.exports = (config) => {
  console.log('\n\n');

  let pages = config.pages

  function sanitizeHtml(html) {
    let regexp = new RegExp('crossorigin="anonymous"', 'g');
    return html.replace(regexp, '');
  }

  function downloadPage(page) {
    let siteStorage = storage.add(page).site(page);

    scrapOptions.urls = page;
    scrapOptions.directory = siteStorage.paths.root;

    let deferred = Q.defer();
    scraper.scrape(scrapOptions, (err, result) => {
      if (err) throw err;
      console.log("Downloading", siteStorage.hostname, '...');

      let html = sanitizeHtml(result[0].text);
      fs.writeFileSync(path.join(siteStorage.paths.root, 'index.html'), html, 'utf-8');

      siteStorage.assets.styles = fs.readdirSync(path.join(siteStorage.paths.root, 'css')); //TODO: fix this

      deferred.resolve();
    })


    return deferred.promise.then(() => { return processPage(siteStorage); });
  }

  let promise = Q();
  pages.forEach((page, i) => {
    promise = promise.then((v) => {
      let promise;
        try {
          promise = downloadPage(page);
        } catch (e) {
          console.log("ERROR".red, e);
        }
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
