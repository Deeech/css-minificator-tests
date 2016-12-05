let Handlebars = require('handlebars'),
		path       = require('path'),
		fs         = require('fs');


let template = Handlebars.compile(fs.readFileSync('./lib/results.hbs', 'utf-8'));

let data = {
	minifiers: [
		{
			name: 'name1',
			version: '1.2.3',
			file: 'file1',
			message: 'message1',
			sites: [
				{
					name: "site1"
				},
				{
					name: "site2"
				}
			]
		},
		{
			name: 'name2',
			version: '2.2.3',
			file: 'file2',
			message: 'message2',
			sites: [
				{
					name: "site1",
					diff: 'diff',
					bug: 'bug'
				},
				{
					name: "site2",
					diff: 'diff'
				}
			]
		},
	]
}

console.log(template(data));

