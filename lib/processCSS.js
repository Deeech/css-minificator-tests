let fs = require('fs'),
    path = require('path');
    cheerio = require('cheerio'),
    request = require('request');

module.exports = (page) => {
  console.log('ProcessCss')

  let $ = cheerio.load(page.body);

  $('link[rel="stylesheet"]').each((i, el) => {
    request($(el).attr('href'), (err, res, body) => {
      let cssName = path.basename($(el).attr('href'));
      
      if (!err && res.statusCode == 200) {
        fs.writeFile(path.join(__dirname, page.url.hostname, cssName), body, (err) => {
          if (err) throw err;
          console.log('css t\'s saved!');
        });
      } else {
        console.log(res.statusCode);
        if (err) throw err;
      }
    });
  });
};
