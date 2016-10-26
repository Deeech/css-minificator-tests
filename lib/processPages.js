let fs = require('fs'),
    path = require('path');
    request = require('request'),
    cheerio = require('cheerio'),
    colors = require('colors'),
    process = require('process'),
    minifiers = require('./minifiers');

function processHTML(site, min) {
  console.log('Processing HTML: '.yellow, min);
  let data = fs.readFileSync(path.join(site.paths.root, 'index.html'), 'utf-8');

  site.assets.styles.forEach((href) => {
    let regexp = new RegExp('href=\".*' + href + '\"', 'g');

    data = data.replace(regexp, 'href="css/' + min + '_' + href + '"');
    fs.writeFileSync(path.join(site.paths.root, min + '_index.html'), data);
  });
}

function processCSS(file, site) {
  console.log('Process file:'.green, file);
  let data = fs.readFileSync(path.join(site.paths.css, file), 'utf-8');


  for (let min in minifiers) {

    if (minifiers[min](data).then) {
      minifiers[min](data).then((data) => {
        fs.writeFileSync(path.join(site.paths.css, min + '_' + file), data);
      })
    } else {
      fs.writeFileSync(path.join(site.paths.css, min + '_' + file), minifiers[min](data));
      processHTML(site, min);
    }
  }
}

module.exports = (storage) => {
  console.log('Processing CSS'.magenta);

  console.log(storage);
  for (let site in storage) {
    storage[site].assets.styles.forEach((file) => {
      processCSS(file, storage[site]);
    })
  }
};
