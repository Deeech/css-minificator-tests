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
  <div class="panel-collapse collapse">
    <div class="panel-body">

    </div>
  </div>
</div>`;

let panelCounter = 0;

$buildSitePanel = ($, site, report, min) => {

}

let $buildMinifierPanel = ($, storage, min) => {
  let isPassed = true,
      output = '';
      bugcount = 0;

  for (let site in storage.sites) {
    let report = storage.sites[site].reports[min];

    for (file in report) {
      bugcount += report[file].bugs.length;
    }
  }

  if (bugcount > 0) {
    output = $(_minifierPanel(`${min} - Failed!`, panelCounter));
    output.addClass('panel-danger');

    // for (let site in storage.sites) {
    //   let report = storage.sites[site].reports[min];
    //   $buildSiteBugsPanel($, site, report, min)
    // }
  } else {
    output = $(_minifierPanel(`${min} - Sucess!`, panelCounter));
    output.addClass('panel-success');
  }
  return output;
}

function markup(html, storage) { //TODO: fix this
  let $ = cheerio.load(html);
  let body = $('body');

  minifiers.forEach((min) => {
    panelCounter++; //TODO: fix
    $buildMinifierPanel($, storage, min).appendTo(body);
    // $(_minifierPanel()).appendTo(body);

    // for (var site in storage.sites) {
    //   let bugcount = 0,
    //       report = storage.sites[site].reports[min];

    //   for (file in report) {
    //     bugcount += report[file].bugs.length;
    //   }

    //   if (bugcount > 0) {
    //     $(`<a data-toggle="collapse" href="#collapse-${panelCounter}">${bugcount} errors in ${Object.keys(report).length} files</a>`);
    //   } else {
    //     $(`<span>${min}</span>`);
    //   }

    // }
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
