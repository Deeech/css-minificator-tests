var CleanCSS = require('clean-css');
var crass = require('crass');
var cssCondense = require('css-condense');
require('es6-promise').polyfill(); // required for cssnano until node 0.10 is supported
try {
 // a path we KNOW is totally bogus and not a module
 var cssnano = require('cssnano');
 // require('./apps/npm-debug.log/app.js')
} catch (e) {
 console.log('oh no big error')
 console.log(e)
}
var csso = require('csso');
var cssshrink = require('cssshrink');
var csswring = require('csswring');
var moreCss = require('more-css');
var ncss = require('ncss');
var sqwish = require('sqwish');
var ycssmin = require('ycssmin');
var Q = require('q');

// var gzipSize = require('gzip-size');
var fs = require('fs');
var path = require('path');

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
      console.log('Error in crass', err);
      throw err;
    }
    return minified;
  },
  'crass_o1_off': function(source) {
    try {
      minified = String(crass.parse(source).optimize());
    } catch (err) {
      console.log('Error in crass', err);
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
  'more-css': function(source) {// here is some bugs bug
    try {
      var minified = moreCss.compress(source, true);
    } catch (e) {
      console.log("asdasdasdasdasdasdasd", e);
    }
    if (minified.indexOf('Error: ') === 0)
      throw new Error(minified);

    return minified;
  },
  'ncss': ncss, // bug
  'sqwish': sqwish.minify,
  'ycssmin': ycssmin.cssmin
};

exports.minifiers = minifiers;

exports.minify = (min, data) => {
  console.log(min);
  let result = {};
  let maybeMinified;
  try {
    maybeMinified = minifiers[min](data);
  } catch (err) {
    console.log("Try catched from minifiers", err);
    result.bug = err;
  }

  return Q(maybeMinified).then((minified) => {
    result.minified = minified;
    return result
  }).catch((err) => {
    console.log("Catched promise error from minifiers", err);
    result.bug = err;
    return result;
  });
}
