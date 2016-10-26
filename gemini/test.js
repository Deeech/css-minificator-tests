gemini.suite('minifiers-test', (suite) => {
  suite
    .setUrl('/')
      .capture('no min')
      .setCaptureElements('html')
    .setUrl('/clean-css_index.html')
      .capture('min')
      .setCaptureElements('html')

  // gemini.suite('no min', function(child) {
  //   child.setUrl('/')
  //     .capture('no min')
  //     .setCaptureElements('html')
  // });
  // gemini.suite('min', function(child) {
  //   child.setUrl('/clean-css_index.html')
  //     .capture('min')
  //     .setCaptureElements('html')
  // });
});
