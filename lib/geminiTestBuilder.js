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

// function addSuite(name) {
//   let str = `
//   .setUrl('/${name}')
//     .setCaptureElements('html')`
//   return str;
// }


// function childSuite(url, name) {
//   let str = `
//   gemini.suite('${name}', function(child) {
//     child.setUrl('/${url}')
//       .capture('no minified')
//       .setCaptureElements('html')
//       .capture('minified', function(actions, elements) {
//         actions.executeJS(function(window) {
//           window.changeMinifier('${name}');
//         }).wait(3000)
//       })
//       .setCaptureElements('html')
//   });
// `
//   return str
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

module.exports = (stage, storage) => {
  let deferred = Q.defer();
  let mins = Object.keys(minifiers);

  let gemini = new Gemini();
  // gemini = new Gemini(path.join('../', '.gemini.js')); // it doesn't work :( bug

  let geminiTestFile = '';
  for (let site in storage) {
    geminiTestFile += openParent(site);
    geminiTestFile += childSuite(site + '/index.html', 'no minified');
    mins.forEach((min) => {
      if (stage === 'pre') {
        geminiTestFile += childSuite(site + '/index.html', min);
      } else {
        geminiTestFile += childSuite(site + '/' + min + '_index.html', min);
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
