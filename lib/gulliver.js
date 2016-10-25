const http = require('http'),
      https = require('https'),
      fs = require('fs'),
      url = require('url'),
      cheerio = require('cheerio'),
      request = require('request'),
      mkdirp = require('mkdirp'),
      path = require('path');

function parseDOM(data) {
  let $ = cheerio.load(data);

  $('link[rel="stylesheet"]').each((i, el) => {
    let _url = url.parse($(el).attr('href'));
    console.log(_url);
  });
}

module.exports = (config) => {
  console.log(config);

  let pages = config.pages;

  for (let i = 0; i < pages.length; i++) {
    let page = pages[i],
        hostname = url.parse(page).hostname;

    console.log(hostname);

    request(page, (err, res, body) => {
      if (!err && res.statusCode == 200) {

        mkdirp.sync(path.join(__dirname, hostname));

        fs.writeFile(path.join(__dirname, hostname, 'index.html'), body, (err) => {
          if (err) throw err;
          console.log('It\'s saved!');
          // parseDOM(body);
        });
      } else {
        console.log(res.statusCode);
        if (err) throw err;
      }
    });
  }

  // for (var i = 0; i < sites.length; i++) {
  //   console.log(sites[i]);
  //   var host = sites[i],
  //       options = {
  //         host: host,
  //       };
  //
  //   https.get(options, (res) => {
  //     var data = '';
  //     console.log("Got response: " + res.statusCode);
  //
  //     res.on("data", (chunk) => {
  //       data += chunk;
  //     });
  //
  //     res.on('end', () => {
  //       fs.writeFile(path.join(__dirname, './' + url.parse(host).hostname + '.html'), data, (err) => {
  //         if (err) throw err;
  //         console.log('It\'s saved!');
  //         parseDOM(data);
  //       });
  //     });
  //   }).on('error', (e) => {
  //     console.log("Got error: " + e.message);
  //   });
  // }
}
