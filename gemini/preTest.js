
gemini.suite('nodejs.org', (suite) => {

  gemini.suite('no minified', function(child) {
    child.setUrl('/nodejs.org/index.html')
      .capture('no minified', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('clean-css', function(child) {
    child.setUrl('/nodejs.org/index.html')
      .capture('clean-css', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('clean-css_advanced_off', function(child) {
    child.setUrl('/nodejs.org/index.html')
      .capture('clean-css_advanced_off', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('crass', function(child) {
    child.setUrl('/nodejs.org/index.html')
      .capture('crass', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('crass_o1_off', function(child) {
    child.setUrl('/nodejs.org/index.html')
      .capture('crass_o1_off', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('css-condense', function(child) {
    child.setUrl('/nodejs.org/index.html')
      .capture('css-condense', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('cssnano', function(child) {
    child.setUrl('/nodejs.org/index.html')
      .capture('cssnano', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('csso', function(child) {
    child.setUrl('/nodejs.org/index.html')
      .capture('csso', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('csso_restructure_off', function(child) {
    child.setUrl('/nodejs.org/index.html')
      .capture('csso_restructure_off', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('cssshrink', function(child) {
    child.setUrl('/nodejs.org/index.html')
      .capture('cssshrink', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('csswring', function(child) {
    child.setUrl('/nodejs.org/index.html')
      .capture('csswring', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('more-css', function(child) {
    child.setUrl('/nodejs.org/index.html')
      .capture('more-css', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('ncss', function(child) {
    child.setUrl('/nodejs.org/index.html')
      .capture('ncss', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('sqwish', function(child) {
    child.setUrl('/nodejs.org/index.html')
      .capture('sqwish', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('ycssmin', function(child) {
    child.setUrl('/nodejs.org/index.html')
      .capture('ycssmin', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

});

gemini.suite('wordpress.org', (suite) => {

  gemini.suite('no minified', function(child) {
    child.setUrl('/wordpress.org/index.html')
      .capture('no minified', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('clean-css', function(child) {
    child.setUrl('/wordpress.org/index.html')
      .capture('clean-css', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('clean-css_advanced_off', function(child) {
    child.setUrl('/wordpress.org/index.html')
      .capture('clean-css_advanced_off', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('crass', function(child) {
    child.setUrl('/wordpress.org/index.html')
      .capture('crass', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('crass_o1_off', function(child) {
    child.setUrl('/wordpress.org/index.html')
      .capture('crass_o1_off', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('css-condense', function(child) {
    child.setUrl('/wordpress.org/index.html')
      .capture('css-condense', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('cssnano', function(child) {
    child.setUrl('/wordpress.org/index.html')
      .capture('cssnano', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('csso', function(child) {
    child.setUrl('/wordpress.org/index.html')
      .capture('csso', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('csso_restructure_off', function(child) {
    child.setUrl('/wordpress.org/index.html')
      .capture('csso_restructure_off', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('cssshrink', function(child) {
    child.setUrl('/wordpress.org/index.html')
      .capture('cssshrink', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('csswring', function(child) {
    child.setUrl('/wordpress.org/index.html')
      .capture('csswring', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('more-css', function(child) {
    child.setUrl('/wordpress.org/index.html')
      .capture('more-css', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('ncss', function(child) {
    child.setUrl('/wordpress.org/index.html')
      .capture('ncss', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('sqwish', function(child) {
    child.setUrl('/wordpress.org/index.html')
      .capture('sqwish', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('ycssmin', function(child) {
    child.setUrl('/wordpress.org/index.html')
      .capture('ycssmin', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

});

gemini.suite('github.com', (suite) => {

  gemini.suite('no minified', function(child) {
    child.setUrl('/github.com/index.html')
      .capture('no minified', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('clean-css', function(child) {
    child.setUrl('/github.com/index.html')
      .capture('clean-css', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('clean-css_advanced_off', function(child) {
    child.setUrl('/github.com/index.html')
      .capture('clean-css_advanced_off', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('crass', function(child) {
    child.setUrl('/github.com/index.html')
      .capture('crass', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('crass_o1_off', function(child) {
    child.setUrl('/github.com/index.html')
      .capture('crass_o1_off', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('css-condense', function(child) {
    child.setUrl('/github.com/index.html')
      .capture('css-condense', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('cssnano', function(child) {
    child.setUrl('/github.com/index.html')
      .capture('cssnano', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('csso', function(child) {
    child.setUrl('/github.com/index.html')
      .capture('csso', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('csso_restructure_off', function(child) {
    child.setUrl('/github.com/index.html')
      .capture('csso_restructure_off', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('cssshrink', function(child) {
    child.setUrl('/github.com/index.html')
      .capture('cssshrink', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('csswring', function(child) {
    child.setUrl('/github.com/index.html')
      .capture('csswring', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('more-css', function(child) {
    child.setUrl('/github.com/index.html')
      .capture('more-css', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('ncss', function(child) {
    child.setUrl('/github.com/index.html')
      .capture('ncss', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('sqwish', function(child) {
    child.setUrl('/github.com/index.html')
      .capture('sqwish', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('ycssmin', function(child) {
    child.setUrl('/github.com/index.html')
      .capture('ycssmin', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

});
