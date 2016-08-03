'use strict';
const numbro = require('numbro');

// Load all languages, increases startup time significantly :(
const fs = require('fs');
const path = require('path');
const langPath = './numbro-languages';
const langFiles = fs.readdirSync(path.join(__dirname, langPath));
langFiles.forEach((langFile) => {
  numbro.culture(
    path.basename(langFile, '.min.js'),
    require(path.join(__dirname, langPath, langFile))
  );
});

module.exports = function numbroHandlebarsExtension(hbs, opts) {
  const language = opts.locale.replace('_', '-');

  // For numeric values without decimals
  hbs.registerHelper('nfn', (value, hash) => {
    numbro.culture(language);
    return numbro(value).format('0,0');
  });

  // For currency based numeric values
  hbs.registerHelper('nfc', (value, hash) => {
    numbro.culture(language);
    return numbro(value).format('0,0.00');
  });

  // For byte based numeric values
  hbs.registerHelper('nfb', (value, hash) => {
    numbro.culture(language);
    return numbro(value).format('0.00b');
  });
};
