let path = require('path'),
    fs   = require('fs'),
    url  = require('url');

class Storage {
  constructor() {
    this.sites = {};
  }

  add(page) {
    let hostname = url.parse(page).hostname,
        rootPath = path.join('site/', hostname);

    this.sites[hostname] = {
      hostname: hostname,
      paths: { 
        js: path.join(rootPath, 'js'),
        css: path.join(rootPath, 'css'),
        img: path.join(rootPath, 'img'),
        root: rootPath,
      },
      assets: {},
      bugs: []
    }

    return this;
  }
  site(page) {
    return this.sites[url.parse(page).hostname];
  }
}

module.exports = Storage;