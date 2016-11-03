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
    <div class="container">
      <div class="row">
        <div class="col-md-12" id="container">
          <a href="gemini-report/index.html">SCREENSHOTS</a>
        </div>
      </div>
    </div>
  </body>
</html>
`;

let _minifierPanel = (title, id) => `
<div class="panel" style="margin-top: 10px;">
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

let storage = null;

$buildSitePanel = ($, site, min) => {
  let bugcount  = 0,
      diff = null,
      errorClass = null,
      title = '',
      report = storage.getReport(site, min);

  for (let file in report) {
    bugcount += report[file].bugs.length;
  }

  if (fs.existsSync(path.join('gemini-report', 'images', site, min, min, 'chrome~diff.png'))) {
    diff = ` - <a href="${path.join('gemini-report', 'images', site, min, min, 'chrome~diff.png')}">diff</a>`
  }

  title = `${site}: No errors!`;

  if (bugcount > 0) {
    title = `<a data-toggle="collapse" href="#panel-collapse-${panelCounter}">${site}: ${bugcount} errors in ${Object.keys(report).length} files</a>`;
    errorClass = 'panel-danger';
  }

  if (diff) {
    title += diff;
    errorClass = 'panel-danger';
  }

  let sitePanel = $(_minifierPanel(title, panelCounter)),
      panelBody = sitePanel.find('.panel-body');

  if (errorClass) {
    sitePanel.addClass(errorClass);
  } else {
    sitePanel.addClass('panel-success');
  }

  for (file in report) {
    if (report[file].bugs.length) {
      $(_error(file, site, min, report[file].bugs[0].error.message)).appendTo(panelBody);
    }
  }

  return $(sitePanel);
}

let $buildMinifierPanel = ($, min) => {
  let isPassed = true,
      $minifierPanel = '';

  let bugCount = storage.minifierBugCount(min);

  for (let site in storage.sites) {
    if (fs.existsSync(path.join('gemini-report', 'images', site, min, min, 'chrome~diff.png'))) {
      isPassed = false;
    }
  }

  if (bugCount > 0 || !isPassed) {
    $minifierPanel = $(_minifierPanel(`<a data-toggle="collapse" href="#panel-collapse-${panelCounter}">${min} - Failed!</a>`, panelCounter));
    $minifierPanel.addClass('panel-danger');

    let panelBody = $minifierPanel.find('.panel-body');

    for (let site in storage.sites) {
      panelCounter++;
      $buildSitePanel($, site, min).appendTo(panelBody);
    }
  } else {
    $minifierPanel = $(_minifierPanel(`${min} - Sucess!`, panelCounter));
    $minifierPanel.addClass('panel-success');
  }

  return $minifierPanel;
}

function markup(html) { //TODO: fix this
  let $ = cheerio.load(html);
  let container = $('#container');

  minifiers.forEach((min) => {
    panelCounter++; //TODO: fix
    $buildMinifierPanel($, min).appendTo(container);
  })

  return $.html();
}

module.exports = (_storage) => {
  storage = _storage;

  let template = markup(html);

  fs.writeFileSync(path.join('./', 'gulliver-report.html'), template, 'utf-8');
  fs.writeFileSync(path.join('./dist', 'index.html'), template, 'utf-8');

  open(path.join('./', 'gulliver-report.html'));
  return 1;
};
