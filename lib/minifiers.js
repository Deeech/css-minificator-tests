var CleanCSS = require('clean-css');
var crass = require('crass');
var cssCondense = require('css-condense');
require('es6-promise').polyfill(); // required for cssnano until node 0.10 is supported
var cssnano = require('cssnano');
var csso = require('csso');
var cssshrink = require('cssshrink');
var csswring = require('csswring');
var moreCss = require('more-css');
var ncss = require('ncss');
var sqwish = require('sqwish');
var ycssmin = require('ycssmin');

// var gzipSize = require('gzip-size');
var fs = require('fs');
var path = require('path');
// var Q = require('q');

// MINIFIERS
module.exports = {
  'clean-css': function(source) {
    return new CleanCSS({ processImport: false }).minify(source).styles;
  },
  'clean-css_advanced_off': function(source) {
    return new CleanCSS({ advanced: false, processImport: false }).minify(source).styles;
  },
  // 'crass': function(source) {
  //   return String(crass.parse(source).optimize({ o1: true }));
  // },
  // 'crass_o1_off': function(source) {
  //   return String(crass.parse(source).optimize());
  // },
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
  // 'more-css': function(source) {
  //   console.log("tet".red);
  //   console.log(source);
  //   var minified = moreCss.compress(source, true);
  //   console.log('trtr1'.red);
  //   if (minified.indexOf('Error: ') === 0)
  //     console.log('trtr'.red);
  //     throw new Error(minified);
  //
  //   return minified;
  // },
  // 'ncss': ncss,
  'sqwish': sqwish.minify,
  'ycssmin': ycssmin.cssmin
};
