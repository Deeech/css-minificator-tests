module.exports = {
  rootUrl: 'http://127.0.0.1:8080',
  gridUrl: 'http://127.0.0.1:4444/wd/hub',
  compositeImage: true,
  // windowSize: '1600x1080',
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  }
};
