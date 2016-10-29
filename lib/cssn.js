// #!/usr/bin/env node
// css nano bug test
require('es6-promise').polyfill();
var cssnano = require('cssnano'),
    path    = require('path'),
    Q       = require('q'),
    fs      = require('fs');

let source = fs.readFileSync(path.join('../site', 'nodejs.org', 'css', 'css.css'), 'utf-8');

let maybeMinified = comp(source),
promise = Q(maybeMinified);

function comp(source) {
  return cssnano.process(source).then(function (result) {
    return result.css;
  });
};

console.log('Source');
console.log(source);
promise.then((minified) => {
  console.log('Maybe minified...');
  console.log(minified);
  console.log('Or not?');
  return minified;
}).catch((err) => { console.log(err); }).done()
