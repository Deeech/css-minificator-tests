const fs                = require('fs'),
      url               = require('url'),
      path              = require('path'),
      scraper           = require('website-scraper'),
      processPages      = require('./processPages'),
      series            = require('run-series'),
      geminiTestBuilder = require('./geminiTestBuilder'),
      storage           = {};

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

  let counter = 0;
  series([
    (callback) => {
      pages.forEach((page, i) => {

        let hostname = url.parse(page).hostname,
            rootPath = path.join('./site/', hostname);

        scrapOptions.urls = page;
        scrapOptions.directory = rootPath;

        scraper.scrape(scrapOptions, (err, result) => {
          if (err) throw err;
          console.log("Downloading", hostname, '...');

          let html = sanitizeHtml(result[0].text);
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
            }
          }

          counter++; // fix this
          if (counter >= pages.length) {
            try {
              processPages(storage);
            } catch (err) {console.log('Error while processing page\n'.red, err.message);}
            callback(null);
          }
        });
      });
    },
    (callback) => {
      console.log('done'.green);
      geminiTestBuilder(storage);
      callback(null);
    }
  ]);
}
