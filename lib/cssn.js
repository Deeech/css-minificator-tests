// css nano bug test
var cssnano = require('cssnano'),
    path = require('path'),
    fs = require('fs');

let source = fs.readFileSync(path.join('site', 'nodejs.org', 'css', 'css.css'), 'utf-8');

cssnano.process(source).then(function (result) {
  return result.css;
}).then((data) => {
  console.log(data); // nothing
}, (err) => {
  console.log(err);
})
