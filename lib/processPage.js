let fs        = require('fs'),
    path      = require('path'),
    Q         = require('q'),
    colors    = require('colors'),
    minifiers = require('./minifiers');

function replaceHref(href, min, data) {
  let regexp = new RegExp('href=\".*' + href + '\"', 'g');
  data = data.replace(regexp, 'href="css/' + min + '_' + href + '"');

  return data;
}

function processHTML(siteStorage, min) {
  let data = fs.readFileSync(path.join(siteStorage.paths.root, 'index.html'), 'utf-8');

  siteStorage.assets.styles.forEach((href) => {
    let indexPath = path.join(siteStorage.paths.root, min + '_index.html');

    data = replaceHref(href, min, data);

    fs.writeFileSync(indexPath, data);
  });
}

function processCSS(file, siteStorage) {
  console.log('Process file:'.green, file);
  let data = fs.readFileSync(path.join(siteStorage.paths.css, file), 'utf-8');

  // let deferred = Q.defer();
  let promise = Q();
  for (let min in minifiers.minifiers) {
    if (!!!siteStorage.reports[min]) { //TODO fix this
      siteStorage.reports[min] = {};
    }
    if (!!!siteStorage.reports[min][file]) { //TODO fix this
      siteStorage.reports[min][file] = {};
    }
    if (!!!siteStorage.reports[min][file].bugs) { //TODO fix this
      siteStorage.reports[min][file].bugs = [];
    }

    try {
      promise = promise.then(() => { return processHTML(siteStorage, min); });
    } catch (err) { console.log('Error while processing HTML:\n'.red, err.message); }

    promise = promise.then(() => {
      return minifiers.minify(min, data);
    }).then((data) => {
      if (data.bug) {
        siteStorage.reports[min][file].bugs.push({ minifier: min, error: data.bug });
      } else {
        return fs.writeFileSync(path.join(siteStorage.paths.css, min + '_' + file), data.minified);
      }
    }).catch((err) => {siteStorage.reports[min][file].bugs.push({ minifier: min, error: data.bug }); return err;});
  }
  return promise;
}

module.exports = (siteStorage) => {
  console.log('Processing page...'.magenta.bold, siteStorage.hostname);

  let promise = Q();
  siteStorage.assets.styles.forEach((file) => {
    promise = promise.then(() => { return processCSS(file, siteStorage) });
  });
  return promise;
};
