let cheerio = require('cheerio'),
    path    = require('path'),
    open    = require("open");
    fs      = require('fs');

let html = `
<html>
  <head><title>Guliver test reports</title><head>
  <body>
    <a href="../gemini-report/index.html">SCREENSHOTS</a>
  </body>
</html>
`;

let sitesWrap = (site) => `
<div class="sites">
  <h3>${site}</h3>
  <h4>Errors:</h4>
  <ul class="files">

  </ul>
</div>
`;

let filesWrap = (file) => `
<li>
  ${file}
  <ul class="bugs">
  </ul>
</li>
`

let messagesWrap = (minifier, message) => `
<li>
  ${minifier}
  <ul class="messages">
    <li><pre>
    ${message}</pre>
    </li>
  </ul>
</li>
`

function markup(html, storage) { // fix this
  let $ = cheerio.load(html)
  let body = $('body');
  for (var site in storage) {
    let sW = $(sitesWrap(site));
    sW.appendTo('body')
    for (var el in storage[site].bugs) {
      let fW = $(filesWrap(el));
      fW.appendTo(sW.find('.files'))
      storage[site].bugs[el].forEach((el) => {
        let mW = $(messagesWrap(el.minifier, el.error.message))
        mW.appendTo(fW.find('.bugs'))
      })
    }
  }
  return $.html();
}

module.exports = (storage) => {
  let reportPath = path.join('./gulliver-report', 'report.html');

  if (!fs.existsSync('./gulliver-report')) {
    fs.mkdirSync('./gulliver-report');
  }

  fs.writeFileSync(reportPath, markup(html, storage), 'utf-8');
  open(reportPath);
  return 1;
};
