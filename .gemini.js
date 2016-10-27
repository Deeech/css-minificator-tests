module.exports = {
  rootUrl: 'http://127.0.0.1:8080',
  gridUrl: 'http://127.0.0.1:4444/wd/hub',
  windowSize: '1920x768',
  sessionQuitTimeout: 10000,
  httpTimeout: 10000,
  compositeImage: true,
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
};
