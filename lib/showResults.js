let cheerio   = require('cheerio'),
    path      = require('path'),
    open      = require("open"),
    minifiers = Object.keys(require('./minifiers').minifiers),
    fs        = require('fs');

let html = `
<html>
  <head>
    <title>Guliver test reports</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <head>
  <body>
    <a href="../gemini-report/index.html">SCREENSHOTS</a>
  </body>
</html>
`;

let _table = `
<table class="table table-bordered table-condensed table-hover table-striped">
  <thead>
    <tr>
      <th></th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>
`;

let _error = (file, site, min, message) => `
<div class="error">
  <h3><a href="../site/${site}/css/${file}">${file}</a></h3>
  <pre>Error message: ${message}</pre>
</div>
`;

let _th = (site) => `<th>${site}</th>`;
let _tr = (min)  => `<tr><td>${min}</td></tr>`;
let _td = (site, min, test) => `<td>Errors: ${test}</td>`;

function markup(html, storage) { //TODO: fix this
  let $ = cheerio.load(html);
  let body = $('body');


  let table = $(_table).appendTo(body);

  for (var site in storage.sites) {
    let th = $(_th(site)).appendTo(table.find('thead tr'));
  }

  minifiers.forEach((min) => {
    let tr = $(_tr(min)).appendTo(table.find('tbody'));

    for (var site in storage.sites) {
      let report = storage.sites[site].reports[min],
          bugcount = 0;

      for (file in report) {
        bugcount += report[file].bugs.length;
      }

      let td = $(_td(site, min, bugcount + " / " + Object.keys(report).length)).appendTo(tr);

      if (fs.existsSync(path.join('gemini-report', 'images', site, min, min, 'chrome~diff.png'))) {
        $(`<br><a href="../gemini-report/images/${site}/${min}/${min}/chrome~diff.png">diff</a>`).appendTo(td);
        td.addClass('warning');
      }

      for (file in report) { // TODO: fix it
        if (report[file].bugs.length) {
          td.addClass('danger');
          $(_error(file, site, min, report[file].bugs[0].error.message)).appendTo(td); //TODO: fix
        } else {
          td.addClass('success');
        }
      }
    }
  })

  return $.html();
}

module.exports = (storage) => {
  let template = markup(html, storage);

  if (!fs.existsSync(path.join('./gulliver-report', 'report.html'))) {
    fs.mkdirSync('./gulliver-report');
  }

  fs.writeFileSync(path.join('./gulliver-report', 'report.html'), template, 'utf-8');
  fs.writeFileSync(path.join('./docs', 'index.html'), template, 'utf-8');

  open(path.join('./docs', 'report.html'));
  return 1;
};
