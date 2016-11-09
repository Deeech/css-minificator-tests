
gemini.suite('nodejs.org', (suite) => {

  gemini.suite('no minified', function(child) {
    child.setUrl('/nodejs.org/index.html')
      .capture('no minified', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('clean-css', function(child) {
    child.setUrl('/nodejs.org/clean-css_index.html')
      .capture('clean-css', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('clean-css_advanced_off', function(child) {
    child.setUrl('/nodejs.org/clean-css_advanced_off_index.html')
      .capture('clean-css_advanced_off', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('crass', function(child) {
    child.setUrl('/nodejs.org/crass_index.html')
      .capture('crass', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('crass_o1_off', function(child) {
    child.setUrl('/nodejs.org/crass_o1_off_index.html')
      .capture('crass_o1_off', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('css-condense', function(child) {
    child.setUrl('/nodejs.org/css-condense_index.html')
      .capture('css-condense', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('cssnano', function(child) {
    child.setUrl('/nodejs.org/cssnano_index.html')
      .capture('cssnano', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('cssnano (safe)', function(child) {
    child.setUrl('/nodejs.org/cssnano (safe)_index.html')
      .capture('cssnano (safe)', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('csso', function(child) {
    child.setUrl('/nodejs.org/csso_index.html')
      .capture('csso', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('csso_restructure_off', function(child) {
    child.setUrl('/nodejs.org/csso_restructure_off_index.html')
      .capture('csso_restructure_off', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('cssshrink', function(child) {
    child.setUrl('/nodejs.org/cssshrink_index.html')
      .capture('cssshrink', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('csswring', function(child) {
    child.setUrl('/nodejs.org/csswring_index.html')
      .capture('csswring', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('more-css', function(child) {
    child.setUrl('/nodejs.org/more-css_index.html')
      .capture('more-css', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('ncss', function(child) {
    child.setUrl('/nodejs.org/ncss_index.html')
      .capture('ncss', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('sqwish', function(child) {
    child.setUrl('/nodejs.org/sqwish_index.html')
      .capture('sqwish', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('ycssmin', function(child) {
    child.setUrl('/nodejs.org/ycssmin_index.html')
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
    child.setUrl('/wordpress.org/clean-css_index.html')
      .capture('clean-css', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('clean-css_advanced_off', function(child) {
    child.setUrl('/wordpress.org/clean-css_advanced_off_index.html')
      .capture('clean-css_advanced_off', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('crass', function(child) {
    child.setUrl('/wordpress.org/crass_index.html')
      .capture('crass', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('crass_o1_off', function(child) {
    child.setUrl('/wordpress.org/crass_o1_off_index.html')
      .capture('crass_o1_off', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('css-condense', function(child) {
    child.setUrl('/wordpress.org/css-condense_index.html')
      .capture('css-condense', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('cssnano', function(child) {
    child.setUrl('/wordpress.org/cssnano_index.html')
      .capture('cssnano', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('cssnano (safe)', function(child) {
    child.setUrl('/wordpress.org/cssnano (safe)_index.html')
      .capture('cssnano (safe)', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('csso', function(child) {
    child.setUrl('/wordpress.org/csso_index.html')
      .capture('csso', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('csso_restructure_off', function(child) {
    child.setUrl('/wordpress.org/csso_restructure_off_index.html')
      .capture('csso_restructure_off', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('cssshrink', function(child) {
    child.setUrl('/wordpress.org/cssshrink_index.html')
      .capture('cssshrink', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('csswring', function(child) {
    child.setUrl('/wordpress.org/csswring_index.html')
      .capture('csswring', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('more-css', function(child) {
    child.setUrl('/wordpress.org/more-css_index.html')
      .capture('more-css', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('ncss', function(child) {
    child.setUrl('/wordpress.org/ncss_index.html')
      .capture('ncss', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('sqwish', function(child) {
    child.setUrl('/wordpress.org/sqwish_index.html')
      .capture('sqwish', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('ycssmin', function(child) {
    child.setUrl('/wordpress.org/ycssmin_index.html')
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
    child.setUrl('/github.com/clean-css_index.html')
      .capture('clean-css', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('clean-css_advanced_off', function(child) {
    child.setUrl('/github.com/clean-css_advanced_off_index.html')
      .capture('clean-css_advanced_off', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('crass', function(child) {
    child.setUrl('/github.com/crass_index.html')
      .capture('crass', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('crass_o1_off', function(child) {
    child.setUrl('/github.com/crass_o1_off_index.html')
      .capture('crass_o1_off', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('css-condense', function(child) {
    child.setUrl('/github.com/css-condense_index.html')
      .capture('css-condense', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('cssnano', function(child) {
    child.setUrl('/github.com/cssnano_index.html')
      .capture('cssnano', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('cssnano (safe)', function(child) {
    child.setUrl('/github.com/cssnano (safe)_index.html')
      .capture('cssnano (safe)', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('csso', function(child) {
    child.setUrl('/github.com/csso_index.html')
      .capture('csso', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('csso_restructure_off', function(child) {
    child.setUrl('/github.com/csso_restructure_off_index.html')
      .capture('csso_restructure_off', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('cssshrink', function(child) {
    child.setUrl('/github.com/cssshrink_index.html')
      .capture('cssshrink', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('csswring', function(child) {
    child.setUrl('/github.com/csswring_index.html')
      .capture('csswring', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('more-css', function(child) {
    child.setUrl('/github.com/more-css_index.html')
      .capture('more-css', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('ncss', function(child) {
    child.setUrl('/github.com/ncss_index.html')
      .capture('ncss', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('sqwish', function(child) {
    child.setUrl('/github.com/sqwish_index.html')
      .capture('sqwish', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

  gemini.suite('ycssmin', function(child) {
    child.setUrl('/github.com/ycssmin_index.html')
      .capture('ycssmin', function(actions, find) {
        actions.wait(2000);
      })
      .setCaptureElements('html')
  });

});
