let Handlebars = require('handlebars'),
		path       = require('path'),
		fs         = require('fs');


let template = Handlebars.compile(fs.readFileSync('./lib/results.hbs', 'utf-8'));

template({});

console.log(template({}));

