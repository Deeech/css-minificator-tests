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
    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <style>
      td {
        padding: 10px !important;
      }
    </style>
  <head>
  <body>
    <a href="gemini-report/index.html">SCREENSHOTS</a>
  </body>
</html>
`;

let _table = `
<table class="table table-bordered table-condensed table-hover table-striped" style="table-layout: fixed; word-wrap: break-word;">
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
  <a href="site/${site}/css/${file}">${file}</a></br>
  <p style="word-wrap: break-word;">Error message: ${message}</p>
</div>
`;

let _th = (site) => `<th>${site}</th>`;
let _tr = (min)  => `<tr><td>${min}</td></tr>`;
let _td = () => `
<td>
  <span class="result label label-success">Success!</span>
  <span class="diff label label-info" style="display: none;"></span></br>
  <div class="panel panel-danger" style="display: none; margin-top: 10px;">
    <div class="panel-heading">
      <h4 class="panel-title">
      </h4>
    </div>
    <div class="panel-collapse collapse">
      <div class="panel-body">

      </div>
    </div>
  </div>
  <div class="errors"></div>
</td>
`;

function markup(html, storage) { //TODO: fix this
  let $ = cheerio.load(html);
  let body = $('body');


  let table = $(_table).appendTo(body);

  for (var site in storage.sites) {
    let th = $(_th(site)).appendTo(table.find('thead tr'));
  }
  let panelCounter = 0;
  minifiers.forEach((min) => {
    let tr = $(_tr(min)).appendTo(table.find('tbody'));
    panelCounter++; //TODO: fix

    for (var site in storage.sites) {
      let report = storage.sites[site].reports[min],
          bugcount = 0;

      for (file in report) {
        bugcount += report[file].bugs.length;
      }

      let td = $(_td()).appendTo(tr);

      if (fs.existsSync(path.join('gemini-report', 'images', site, min, min, 'chrome~diff.png'))) {
        $(`<a href="gemini-report/images/${site}/${min}/${min}/chrome~diff.png">diff</a>`).appendTo(td.find('.diff').css('display', 'inline'));
        td.addClass('danger');
        td.find('.result').removeClass("label-success").addClass('label-danger').text('Failed!');
      }

      if (bugcount > 0) {
        $(`<a data-toggle="collapse" href="#collapse-${panelCounter}">${bugcount} errors in ${Object.keys(report).length} files</a>`)
        .appendTo(td.find('.panel-title'));
        td.find('.panel-collapse').attr('id', `collapse-${panelCounter}`);
        td.find('.result').addClass('label label-danger').text('Failed!');
      }

      for (file in report) { // TODO: fix it
        if (report[file].bugs.length) {
          $(_error(file, site, min, report[file].bugs[0].error.message))
          .appendTo(td.find('.panel-body')); //TODO: fix
          td.find('.panel').css('display', 'block');
          td.addClass('danger');
        } else {
          td.addClass('success');
        }
      }
      panelCounter++; //TODO: fix
    }
  })

  return $.html();
}

module.exports = (storage) => {
  let template = markup(html, storage);

  fs.writeFileSync(path.join('./', 'gulliver-report.html'), template, 'utf-8');
  fs.writeFileSync(path.join('./dist', 'index.html'), template, 'utf-8');

  open(path.join('./', 'gulliver-report.html'));
  return 1;
};
