// let stringTest = '<div id="gulliver-style-changer"><script src="https://code.jquery.com/jquery-2.2.4.min.js"></script><script>window.changeMinifier = function(minifier) { var scripts = $(\'link[rel="stylesheet"]\').attr(\'href\', function (i, attr) {return attr.replace(/css\\/(.*\\\.css)/, \'css/\' + minifier + \'_\' + \'$1\')});};</script></div>';
// //
// //
// // function appendHtml(str) {
// //   var div = document.createElement('div');
// //   div.innerHTML = str;
// //   document.body.appendChild(div);
// // }
// // appendHtml(stringTest);
//
// // document.body.appendChild(stringTest);
// // $('body').append($(stringTest));
// // var html = '<h1 id="title">Some Title</h1><span style="display:inline-block; width=100px;">Some arbitrary text</span>';
// // appendHtml(document.body, html); // "body" has two more children - h1 and span.
// let cheerio = require('cheerio'),
//     Q = require('q'),
//     path = require('path'),
//     fs = require('fs');
//
// module.exports = (storage) => {
//   console.log(storage);
//
//   for (var site in storage) {
//     let html = fs.readFileSync(path.join(storage[site].paths.root, 'index.html'), 'utf-8');
//     let $ = cheerio.load(html)
//     $(stringTest).appendTo('body');
//     fs.writeFileSync(path.join(storage[site].paths.root, 'index.html'), $.html(), 'utf-8');
//     console.log(site);
//   }
//   return 1;
// };
