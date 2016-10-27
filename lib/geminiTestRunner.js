let Gemini = require('gemini/api');

let gemini = new Gemini();
// gemini = new Gemini(path.join('../', '.gemini.js')); // it doesn't work :( bug


// gemini.readTests().done((collection) => {
//   gemini.test
// });

// gemini.update({ // bug
//   reporters: ['vflat', 'html']
// }).catch((err) => { throw err; })

gemini.test({
  reporters: ['vflat', 'html']
})
