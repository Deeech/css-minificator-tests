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

let _minifierPanel = (title, id) => `
<div class="panel" id="panel-${id}" style="margin-top: 10px;">
  <div class="panel-heading">
    <h4 class="panel-title">
    ${title}
    </h4>
  </div>
  <div id="panel-collapse-${id}" class="panel-collapse collapse">
    <div class="panel-body">

    </div>
  </div>
</div>`;

let _error = (file, site, min, message) => `
<div class="error">
  <a href="site/${site}/css/${file}">${file}</a></br>
  <p style="word-wrap: break-word;">Error message: ${message}</p>
</div>
`;

let panelCounter = 0;

$buildSitePanel = ($, minifierPanel, site, report, min) => {
  let sitePanel = '',
      bugcount  = 0;

  for (file in report) {
    bugcount += report[file].bugs.length;
  }

  sitePanel = $(_minifierPanel(`<a data-toggle="collapse" href="#panel-collapse-${panelCounter}">${site}: ${bugcount} errors in ${Object.keys(report).length} files</a>`, panelCounter));

  let panelBody = sitePanel.find('.panel-body');
  for (file in report) {
    if (report[file].bugs.length) {
      $(_error(file, site, min, report[file].bugs[0].error.message)).appendTo(panelBody);
    }
  }

  return $(sitePanel);
}

let $buildMinifierPanel = ($, storage, min) => {
  let isPassed = true,
      minifierPanel = '';
      bugcount = 0;

  for (let site in storage.sites) {
    let report = storage.sites[site].reports[min];

    for (file in report) {
      bugcount += report[file].bugs.length;
    }
  }

  if (bugcount > 0) {
    minifierPanel = $(_minifierPanel(`<a data-toggle="collapse" href="#panel-collapse-${panelCounter}">${min} - Failed!</a>`, panelCounter));
    minifierPanel.addClass('panel-danger');

    let panelBody = minifierPanel.find('.panel-body');

    for (let site in storage.sites) {
      let report = storage.sites[site].reports[min];
      panelCounter++;

      $buildSitePanel($, minifierPanel, site, report, min).appendTo(panelBody);
    }
  } else {
    minifierPanel = $(_minifierPanel(`${min} - Sucess!`, panelCounter));
    minifierPanel.addClass('panel-success');
  }
  return minifierPanel;
}

function markup(html, storage) { //TODO: fix this
  let $ = cheerio.load(html);
  let body = $('body');

  minifiers.forEach((min) => {
    panelCounter++; //TODO: fix
    $buildMinifierPanel($, storage, min).appendTo(body);
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
