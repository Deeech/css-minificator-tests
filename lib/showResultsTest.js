let Handlebars = require('handlebars'),
		path       = require('path'),
		fs         = require('fs');


let template = Handlebars.compile(fs.readFileSync('./lib/results.hbs', 'utf-8'));

let data = {
	minifiers: [
		{title: 'title1', file: 'file1', message: 'message1'},
		{title: 'title2', file: 'file2', message: 'message2'},
	]
}

console.log(template(data));

