'use strict';
const numbro = require('numbro');

module.exports = function numbroHandlebarsExtension(hbs, opts) {
  const language = opts.locale.replace('_', '-');
  // internal numbro hack to register languages within node.js
  // loads lazily instead of everything, should also boost performance
  numbro.loadCulturesInNode();
  numbro.setCulture(language);

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
