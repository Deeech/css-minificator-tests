const Gemini    = require('gemini/api'),
      path      = require('path'),
      fs        = require('fs'),
      Q         = require('q'),
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

function childSuite(url, name, captureElements) {
  let str = `
  gemini.suite('${name}', function(child) {
    child.setUrl('/${url}')
      .capture('${name}', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('${captureElements}')
  });
`
  return str
}

module.exports = (stage, storage) => {
  let deferred = Q.defer();
  let mins = Object.keys(minifiers);

  let gemini = new Gemini();

  let geminiTestFile = '';
  for (let site in storage.sites) {
    geminiTestFile += openParent(site);
    mins.forEach((min) => {
      if (stage === 'pre') {
        geminiTestFile += childSuite(site + '/index.html', min, storage.sites[site].captureElements);
      } else {
        geminiTestFile += childSuite(site + '/' + min + '_index.html', min, storage.sites[site].captureElements);
      }
    });
    geminiTestFile += closeParent();
  }


  if (stage === 'pre') {
    fs.writeFileSync('./gemini/preTest.js', geminiTestFile);
    gemini.update(['./gemini/preTest.js'], {
      new: true,
      reporters: ['vflat', 'html']
    }).done((data) => { deferred.resolve(); return })
  } else {
    fs.writeFileSync('./gemini/postTest.js', geminiTestFile);
    gemini.test(['./gemini/postTest.js'], {
      reporters: ['vflat', 'html']
    }).then((data) => { deferred.resolve(); return; })
  }

  return deferred.promise.then(() => { return 1; });
}
