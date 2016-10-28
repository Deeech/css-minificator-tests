const Gemini    = require('gemini/api'),
      path      = require('path'),
      fs        = require('fs'),
      Q         = require('q');
      minifiers = require('./minifiers').minifiers;

function openParent(name) {
  let str = `
gemini.suite('${name}', (suite) => {
`
  return str;
}

function closeParent() {
  let str = `
});
`
  return str;
}

// function addSuite(name) {
//   let str = `
//   .setUrl('/${name}')
//     .setCaptureElements('html')`
//   return str;
// }

function childSuite(url, name) {
  let str = `
  gemini.suite('${name}', function(child) {
    child.setUrl('/${url}')
      .capture('${name}')
      .setCaptureElements('html')
  });
`
  return str
}

module.exports = (storage) => {
  let deferred = Q.defer();
  let mins = Object.keys(minifiers);

  let gemini = new Gemini();
  // gemini = new Gemini(path.join('../', '.gemini.js')); // it doesn't work :( bug

  let geminiTestFile = '';

  for (let site in storage) {
    geminiTestFile += openParent(site);
    geminiTestFile += childSuite(site + '/', 'no minified');
    mins.forEach((min) => {
      geminiTestFile += childSuite(site + '/' + min + '_index.html', min);
    });
    geminiTestFile += closeParent();
  }

  fs.writeFileSync('./gemini/test.js', geminiTestFile);
  deferred.resolve();
  console.log('resolved');
  return deferred.promise.then(() => { return 1; });
}
