let cheerio   = require('cheerio'),
    path      = require('path'),
    open      = require("open"),
    minifiers = Object.keys(require('./minifiers').minifiers),
    fs        = require('fs');

let html = `
<html>
  <head>
    <title>CSS minificator tests</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <style>
      td {
        padding: 10px !important;
      }
      .social-links li {
        padding: 10px;
      }
    </style>
  <head>
  <body>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">CSS minificator tests</a>
        </div>
        <div class="navbar-right">
          <ul class="nav navbar-nav social-links">
            <li>
              <a class="github-button" href="https://github.com/Deeech" data-style="mega" aria-label="Follow @Deeech on GitHub">Follow @Deeech</a>
            </li>
            <li>
              <a class="github-button" href="https://github.com/Deeech/css-minification-tests" data-icon="octicon-star" data-style="mega" aria-label="Star Deeech/css-minification-tests on GitHub">Star</a>
            </li>
            <li>
              <a class="github-button" href="https://github.com/Deeech/css-minification-tests/issues" data-icon="octicon-issue-opened" data-style="mega" aria-label="Issue Deeech/css-minification-tests on GitHub">Issue</a>
            </li>
          </ul>
        </div>
      </div><!-- /.container-fluid -->
    </nav>
    <div class="container">
      <div class="row">
        <div class="col-md-12" id="container">
          <p>
            Here you can see results of a minificatiors tests. The script downloads a few sites, compress their css files and then launches screenshot testing all sites using <a href="https://github.com/gemini-testing/gemini">gemini</a>. You can view more details under the spoilers.
          </p>
        </div>
      </div>
    </div>
    <script async defer src="https://buttons.github.io/buttons.js"></script>
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

let _error = (file, site, message) => `
<div class="error">
  <a href="site/${site}/css/${file}">${file}</a></br>
  <pre style="word-wrap: break-word;">${message}</pre>
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
      let error = report[file].bugs[0].error,
          message = null;

      message = error.stack ? error.stack : error.message;
      $(_error(file, site, message)).appendTo(panelBody);
    }
  }

  return $(sitePanel);
}

let $buildMinifierPanel = ($, min) => {
  let isFailed = '',
      $minifierPanel = '';

  let bugCount = storage.minifierBugCount(min);

  for (let site in storage.sites) {
    if (fs.existsSync(path.join('gemini-report', 'images', site, min, min, 'chrome~diff.png'))) {
      isFailed = ' - There are diffs';
    }
  }

  if (bugCount > 0 || isFailed) {
    let siteErrorsCounter = 0;

    for (let site in storage.sites) {
      let report = storage.sites[site].reports[min],
          bugcount = 0;
      for (let file in report) {
        if (report[file].bugs.length > 0) bugcount++;
      }
      if (bugcount > 0) siteErrorsCounter++;
    }

    $minifierPanel = $(_minifierPanel(`<a data-toggle="collapse" href="#panel-collapse-${panelCounter}">${min} - ${siteErrorsCounter}/${Object.keys(storage.sites).length} Failed!${isFailed}</a>`, panelCounter));
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

  fs.writeFileSync('test-report.html', template, 'utf-8');

  if (!fs.existsSync('dist')){
    fs.mkdirSync('dist');
  }

  fs.writeFileSync(path.join('dist', 'index.html'), template, 'utf-8');

  open('test-report.html');
  return 1;
};
