let Gemini = require('gemini/api'),
    path = require('path'),
    minifiers = require('./minifiers');

module.exports = () => {
  let mins = Object.keys(minifiers);

  // gemini = new Gemini(path.join('../', '.gemini.js')); // it doesn't work :(

  console.log(gemini);

  console.log(mins);
}
