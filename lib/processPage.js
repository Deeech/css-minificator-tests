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

  console.log();
  console.log('Processing HTML: '.yellow, min);
  // console.log('\t', path.join(siteStorage.paths.root, min + '_index.html'));

  siteStorage.assets.styles.forEach((href) => {
    let indexPath = path.join(siteStorage.paths.root, min + '_index.html');

    data = replaceHref(href, min, data);

    // console.log('\t\t', min + '_' + href);

    fs.writeFileSync(indexPath, data);
  });
}

function processCSS(file, siteStorage) {
  console.log('Process file:'.green, file);
  let data = fs.readFileSync(path.join(siteStorage.paths.css, file), 'utf-8');

  // let deferred = Q.defer();
  let promise = Q();
  for (let min in minifiers.minifiers) {
    siteStorage.bugs[min] = [];
    try {
      promise = promise.then(() => { return processHTML(siteStorage, min); });
    } catch (err) { console.log('Error while processing HTML:\n'.red, err.message); }

    promise = promise.then(() => {
      return minifiers.minify(min, data);
    }).then((data) => {
      if (data.bug) {
        siteStorage.bugs[min].push(data.bug);
        console.log(siteStorage);
      } else {
        return fs.writeFileSync(path.join(siteStorage.paths.css, min + '_' + file), data.minified);
      }
    }).catch((err) => {siteStorage.bugs[min].push(err); return err;});

    // deferred.resolve();
    // deferred.promise = deferred.promise
    // .then(() => {
    //   return minifiers.minify(min, data);
    // })
    // .then((data) => {
    //     fs.writeFileSync(path.join(siteStorage.paths.css, min + '_' + file), data.minified);
    // });
  }
  return promise;
}

module.exports = (site, siteStorage) => {
  console.log('Processing page...'.magenta.bold, site);
  let promise = Q();
  siteStorage.assets.styles.forEach((file) => {
    promise = promise.then(() => { return processCSS(file, siteStorage) });
  });
  return promise;
  // storage[site].assets.styles.forEach((file) => {
  //   try {
  //   } catch (err) {console.log('Error while processing CSS:\n'.red, err.message);}
  // })
};
