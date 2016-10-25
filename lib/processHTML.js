let path = require('path'),
    cheerio = require('cheerio'),
    request = require('request'),
    mkdirp = require('mkdirp'),
    fs = require('fs');

module.exports = (page, callback) => {
  mkdirp.sync(path.join(__dirname, page.url.hostname));

  let $ = cheerio.load(page.body);

  $('link[rel="stylesheet"]').each((i, el) => {

    let cssName = path.basename($(el).attr('href'));
    let regexp = new RegExp('href=\".*' + cssName + '\"', 'g');
    console.log(regexp);
    page.body = page.body.replace(regexp, 'href="./' + cssName + '"')
    regexp = new RegExp('crossorigin="anonymous"', 'g');
    page.body = page.body.replace(regexp, '')

    request($(el).attr('href'), (err, res, body) => {
      if (!err && res.statusCode == 200) {
        fs.writeFile(path.join(__dirname, page.url.hostname, cssName), body, (err) => {
          if (err) throw err;
          console.log('css t\'s saved!');

          console.log('ProcessHtml');
          fs.writeFile(path.join(__dirname, page.url.hostname, 'index.html'), page.body, (err) => {
            if (err) throw err;
            console.log('It\'s saved!');
            //callback(page);
          });
        });
      } else {
        console.log(res.statusCode);
        if (err) throw err;
      }
    });
  });
};
