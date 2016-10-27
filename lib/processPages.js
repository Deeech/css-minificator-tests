let fs        = require('fs'),
    path      = require('path');
    colors    = require('colors'),
    minifiers = require('./minifiers');

function replaceHref(href, min, data) {
  let regexp = new RegExp('href=\".*' + href + '\"', 'g');
  
  data = data.replace(regexp, 'href="css/' + min + '_' + href + '"');

  return data;
}

function processHTML(site, min) {
  let data = fs.readFileSync(path.join(site.paths.root, 'index.html'), 'utf-8');

  console.log();
  console.log('Processing HTML: '.yellow, min);
  console.log('\t', path.join(site.paths.root, min + '_index.html'));

  site.assets.styles.forEach((href) => {
    let indexPath = path.join(site.paths.root, min + '_index.html');

    data = replaceHref(href, min, data);

    console.log('\t\t', min + '_' + href);

    fs.writeFileSync(indexPath, data);
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
  for (let site in storage) {
    console.log('Processing page...'.magenta.bold, site);
    storage[site].assets.styles.forEach((file) => {
      processCSS(file, storage[site]);
    })
  }
};
