let path = require('path'),
    fs   = require('fs'),
    minifiers = require('./minifiers').minifiers,
    url  = require('url');

class Storage {
  constructor() {
    this.sites = {};
  }

  add(page) {
    let rootPath = path.join('site/', page.name);

    this.sites[page.name] = {
      name: page.name,
      captureElements: page.captureElements,
      url: page.url,
      paths: {
        root: rootPath,
        js: path.join(rootPath, 'js'),
        css: path.join(rootPath, 'css'),
        img: path.join(rootPath, 'img'),
      },
      assets: {},
      reports: {}
    }

    Object.keys(minifiers).forEach((min) => {
      this.sites[page.name].reports[min] = {};
    });

    return this;
  }

  minifierBugCount(min) {
    let bugCount = 0;

    for (let site in this.sites) {
      let report = this.sites[site].reports[min];

      for (let file in report) {
        bugCount += report[file].bugs.length;
      }
    }

    return bugCount;
  }

  getReport(site, min) {
    return this.sites[site].reports[min];
  }

  site(name) {
    return this.sites[name];
  }

  hostname(page) {
    return this.sites[url.parse(page).hostname].hostname;
  }

  paths(page) {
    return this.sites[url.parse(page).hostname].paths;
  }

  assets(page) {
    return this.sites[url.parse(page).hostname].assets;
  }

  reports(page) {
    return this.sites[url.parse(page).hostname].reports;
  }
}

module.exports = Storage;
