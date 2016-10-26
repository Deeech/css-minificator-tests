const http = require('http'),
      https = require('https'),
      fs = require('fs'),
      url = require('url'),
      request = require('request'),
      mkdirp = require('mkdirp'),
      path = require('path'),
      processHTML = require('./processHTML'),
      scraper = require('website-scraper'),
      processPages = require('./processPages'),
      series = require('run-series'),
      geminiTestBuilder = require('./geminiTestBuilder'),
      storage = {};

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

  let counter = 0;
  geminiTestBuilder();
  // series([
  //   (callback) => {
  //     pages.forEach((page, i) => {
  //       let hostname = url.parse(page).hostname,
  //       rootPath = path.join('./site/', hostname);
  //
  //       scrapOptions.urls = page;
  //       scrapOptions.directory = rootPath;
  //
  //       scraper.scrape(scrapOptions, (err, result) => {
  //         if (err) throw err;
  //         let regexp = new RegExp('crossorigin="anonymous"', 'g'),
  //         data = result[0].text;
  //
  //         data = result[0].text.replace(regexp, '');
  //         fs.writeFileSync(path.join(rootPath, 'index.html'), data);
  //
  //
  //         storage[hostname] = {
  //           paths: {
  //             js: path.join(rootPath, 'js'),
  //             css: path.join(rootPath, 'css'),
  //             img: path.join(rootPath, 'img'),
  //             root: rootPath,
  //           },
  //           assets: {
  //             styles: fs.readdirSync(path.join(rootPath, 'css'))
  //           }
  //         }
  //
  //         counter++; // fix this
  //         if (counter >= pages.length) {
  //           processPages(storage);
  //           callback(null);
  //         }
  //       });
  //     });
  //   },
  //   (callback) => {
  //     console.log('tet');
  //     //build gemini test files
  //     callback(null);
  //   }
  // ]);
}
