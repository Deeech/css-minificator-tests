const http = require('http'),
      https = require('https'),
      fs = require('fs'),
      url = require('url'),
      request = require('request'),
      mkdirp = require('mkdirp'),
      path = require('path'),
      processHTML = require('./processHTML'),
      scraper = require('website-scraper'),
      processCSS = require('./processCSS');

module.exports = (config) => {
  console.log(config);
  console.log();

  let pages = config.pages

  for (let i = 0; i < pages.length; i++) {
    let pagePath = './site/' + url.parse(pages[i]).hostname;

    let scrapOptions = {
      urls: pages[i],
      directory: pagePath,
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


    console.log("Scraping site:".blue, pages[i]);
    scraper.scrape(scrapOptions, function (error, result) {
      if (error) throw error
      let regexp = new RegExp('crossorigin="anonymous"', 'g');
      fs.readFile(path.join(pagePath, 'index.html'), 'utf8', function (err, data) {
        if (err) throw err;
        data = data.replace(regexp, '')
        fs.writeFile(path.join(pagePath, 'index.html'), data, (err) => {
          if (err) throw err;
          processCSS(pagePath);
        });
      });
    });
  }
}
