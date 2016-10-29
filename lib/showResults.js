let cheerio = require('cheerio'),
    path    = require('path'),
    open    = require("open"),
    minifiers = Object.keys(require('./minifiers').minifiers),
    fs      = require('fs');

let html = `
<html>
  <head><title>Guliver test reports</title><head>
  <body>
    <a href="../gemini-report/index.html">SCREENSHOTS</a>
  </body>
</html>
`;

let _table = `
<table>
  <thead>
    <tr>
      <th></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>
`;

let _th = (site) => `<th>${site}</th>`;

let _td = (test) => `<td>${test}</td>`;

let _tr = (min) => `<tr><td>${min}</td></tr>`;

function markup(html, storage) { // fix this
  let $ = cheerio.load(html);
  let body = $('body');


  let table = $(_table).appendTo(body);
  
  for (var site in storage.sites) {
    let th = $(_th(site)).appendTo(table.find('thead tr'));

  }

  minifiers.forEach((min) => {
    let tr = $(_tr(min)).appendTo(table.find('tbody'));

    for (var site in storage.sites) {
      let report = storage.sites[site].reports[min];
      let bugcount = 0;
      for (file in report) {
        bugcount += report[file].bugs.length;
      }
      let td = $(_td(bugcount + " / " + Object.keys(report).length)).appendTo(tr);
    }
  })
  
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
