
gemini.suite('nodejs.org', (suite) => {

  gemini.suite('no minified', function(child) {
    child.setUrl('/nodejs.org/')
      .capture('no minified')
      .setCaptureElements('html')
  });

  gemini.suite('clean-css', function(child) {
    child.setUrl('/nodejs.org/clean-css_index.html')
      .capture('clean-css')
      .setCaptureElements('html')
  });

  gemini.suite('ycssmin', function(child) {
    child.setUrl('/nodejs.org/ycssmin_index.html')
      .capture('ycssmin')
      .setCaptureElements('html')
  });

});
