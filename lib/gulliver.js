const http = require('http'),
      https = require('https'),
      fs = require('fs'),
      url = require('url'),
      request = require('request'),
      mkdirp = require('mkdirp'),
      path = require('path'),
      processHTML = require('./processHTML'),
      processCSS = require('./processCSS');

module.exports = (config) => {
  console.log(config);
  let pages = config.pages;

  for (let i = 0; i < pages.length; i++) {
    let page = {
      url: url.parse(pages[i])
    }

    console.log(page.url.hostname);

    request(pages[i], (err, res, body) => {
      if (!err && res.statusCode == 200) {
        page.body = body;
        processHTML(page);
        //processHTML(page, processCSS);
      } else {
        console.log(res.statusCode);
        if (err) throw err;
      }
    });
  }
}
