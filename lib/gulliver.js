let   fs                = require('fs'),
      url               = require('url'),
      path              = require('path'),
      scraper           = require('website-scraper'),
      processPage       = require('./processPage'),
      geminiTestBuilder = require('./geminiTestBuilder'),
      Q                 = require('q'),
      showResults       = require('./showResults');


let storage = {};

module.exports = (config) => {
  console.log('\n\n');

  let pages = config.pages

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
    let regexp = new RegExp('crossorigin="anonymous"', 'g');
    return html.replace(regexp, '');
  }

  function downloadPage(page) {
    let hostname = url.parse(page).hostname,
        rootPath = path.join('./site/', hostname);

    scrapOptions.urls = page;
    scrapOptions.directory = rootPath;

    let deferred = Q.defer();
    scraper.scrape(scrapOptions, (err, result) => {
      if (err) throw err;
      let html = sanitizeHtml(result[0].text);
      console.log("Downloading", hostname, '...');

      fs.writeFileSync(path.join(rootPath, 'index.html'), html, 'utf-8');

      storage[hostname] = {
        paths: {
          js: path.join(rootPath, 'js'),
          css: path.join(rootPath, 'css'),
          img: path.join(rootPath, 'img'),
          root: rootPath,
        },
        assets: {
          styles: fs.readdirSync(path.join(rootPath, 'css'))
        },
        bugs: []
      }
      deferred.resolve();
    })

    return deferred.promise.then(() => { return processPage(hostname, storage[hostname]); });
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
      return geminiTestBuilder(storage);
    })
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
