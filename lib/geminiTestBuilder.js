const Gemini    = require('gemini/api'),
      path      = require('path'),
      fs        = require('fs'),
      minifiers = require('./minifiers');

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
  let mins = Object.keys(minifiers);

  let gemini = new Gemini({
    rootUrl: 'http://127.0.0.1:8080',
    gridUrl: 'http://127.0.0.1:4444/wd/hub',
    compositeImage: true,
    windowSize: '1024x768',
    browsers: {
      chrome: {
        desiredCapabilities: {
          browserName: 'chrome'
        }
      }
    },
    system: {
      projectRoot: './'
    }
  });

  let geminiTestFile = '';
  // gemini = new Gemini(path.join('../', '.gemini.js')); // it doesn't work :( bug

  for (let site in storage) {
    geminiTestFile += openParent(site);
    geminiTestFile += childSuite(site + '/', 'no minified');
    mins.forEach((min) => {
      geminiTestFile += childSuite(site + '/' + min + '_index.html', min);
    });
    geminiTestFile += closeParent();
  }

  fs.writeFileSync('./gemini/test.js', geminiTestFile);
}
