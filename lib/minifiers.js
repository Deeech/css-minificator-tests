let CleanCSS    = require('clean-css'),
    crass       = require('crass'),
    cssCondense = require('css-condense');

require('es6-promise').polyfill(); // required for cssnano until node 0.10 is supported

let cssnano     = require('cssnano'),
    csso        = require('csso'),
    cssshrink   = require('cssshrink'),
    csswring    = require('csswring'),
    moreCss     = require('more-css'),
    ncss        = require('ncss'),
    sqwish      = require('sqwish'),
    ycssmin     = require('ycssmin'),
    Q           = require('q')
    colors      = require('colors');

// var gzipSize = require('gzip-size');
let fs   = require('fs'),
    path = require('path');

// MINIFIERS
var minifiers = {
  'clean-css': function(source) {
    return new CleanCSS({ processImport: false }).minify(source).styles;
  },
  'clean-css_advanced_off': function(source) {
    return new CleanCSS({ advanced: false, processImport: false }).minify(source).styles;
  },
  'crass': function(source) {
    let minified;
    try {
      minified = String(crass.parse(source).optimize({ o1: true }))
    } catch (err) {
      throw err;
    }
    return minified;
  },
  'crass_o1_off': function(source) {
    try {
      minified = String(crass.parse(source).optimize());
    } catch (err) {
      throw err;
    }
    return minified;
  },
  'css-condense': function(source) {
    return cssCondense.compress(source, { safe: true });
  },
  'cssnano': function (source) {
    return cssnano.process(source).then(function (result) {
      return result.css;
    });
  },
  'csso': function(source) {
    return csso.minify(source).css;
  },
  'csso_restructure_off': function(source) {
    return csso.minify(source, { restructure: false }).css;
  },
  'cssshrink': cssshrink.shrink,
  'csswring': function (source) {
    return csswring.wring(source).css;
  },
  'more-css': function(source) {
    try {
      var minified = moreCss.compress(source, true);
    } catch (e) {
      throw e;
    }

    return minified;
  },
  'ncss': ncss,
  'sqwish': sqwish.minify,
  'ycssmin': ycssmin.cssmin
};

exports.minifiers = minifiers;

exports.minify = (min, data) => {
  let result = {},
      maybeMinified;

  try {
    maybeMinified = minifiers[min](data);
  } catch (err) {
    result.bug = err;
  }

  return Q(maybeMinified).then((minified) => {
    result.minified = minified;
    return result
  }).catch((err) => {
    result.bug = err;
    return result;
  });
}
