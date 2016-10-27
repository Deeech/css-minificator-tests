let Gemini = require('gemini/api'),
    colors = require('colors');

let mins = ['clean-css', 'ycssmin'];

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

let logs = gemini.readTests().done(function(collection) {
  let cust_suites = [],
      cust_suite;
  mins.forEach((min, i) => {

    collection.topLevelSuites().forEach(function(suite) {
      console.log('suite.states'.yellow);
      console.log(suite.states);
      cust_suite = JSON.parse(JSON.stringify(suite));
      cust_suite.url = suite.url + min + '_index.html'
      cust_suite.id += i + 1
      cust_suite.name += min;
      // cust_suite.states.name += min;
      cust_suites.push(cust_suite);
      // console.log(cust_suite);
      // gemini.test(cust_suite).then((a, b, c) => {
      //   console.log(a);
        // suite.url = ('clean-css_index.html')
        // gemini.test(suite)
      // });
      // gemini.test(suite)
    });
  });
  console.log('cust_suites'.yellow);
  console.log(cust_suites);
  cust_suites.forEach((s) => {
    collection.add(s);
  });

  // console.log(collection.allSuites());
  // gemini.test(collection)
});

// console.log(logs);
