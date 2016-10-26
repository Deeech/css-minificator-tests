let fs = require('fs'),
    path = require('path');
    request = require('request'),
    cheerio = require('cheerio'),
    colors = require('colors'),
    minifiers = require('./minifiers');

function processHTML(cssPath, min) {
  let htmlPath = path.join(cssPath, '../');

  fs.readFile(path.join(htmlPath, 'index.html'), 'utf-8', (err, data) => {
    if (err) throw err;
    console.log('Processing HTML'.yellow);
    let $ = cheerio.load(data);

    $('link[rel="stylesheet"]').each((i, el) => {

      let cssName = path.basename($(el).attr('href'));
      let regexp = new RegExp('href=\".*' + cssName + '\"', 'g');
      data = data.replace(regexp, 'href="css/' + min + '_' + cssName + '"');
      fs.writeFile(path.join(htmlPath, min + '_index.html'), data, (err) => {
        if (err) throw err;
      })
    });
  });
}

function processCSS(cssPath, file) {
  fs.readFile(path.join(cssPath, file), 'utf8', (err, data) => {
    console.log('Process file:'.green, file);
    if (err) throw err;
    //minify css

    for (let min in minifiers) {
      console.log('Minifying with: '.cyan, min);
      fs.writeFile(path.join(cssPath, min + '_' + file), minifiers[min](data), (err) => {
        if (err) throw err;
        processHTML(cssPath, min);
      });
    }

  });
}

module.exports = (pagePath) => {
  console.log('Processing CSS'.magenta);
  let cssPath = path.join(pagePath, 'css');
  fs.readdir(path.join(pagePath, 'css'), (err, files) => {
    files.forEach(file => {
      processCSS(cssPath, file);
    });
  })
};
