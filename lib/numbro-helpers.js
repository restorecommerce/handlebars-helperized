'use strict';

const numbro = require('numbro');
const allLanguages = require('numbro/dist/languages.min');

Object.values(allLanguages).forEach((data) => {
  numbro.registerLanguage(data);
});

module.exports = function numbroHandlebarsExtension(hbs, opts) {
  const locale = opts.locale.replace('_', '-');

  // For numeric values without decimals
  hbs.registerHelper('nfn', (value, hash) => {
    numbro.setLanguage(locale);
    return numbro(value).format({
      thousandSeparated: true,
      mantissa: 0
    });
  });

  // For currency based numeric values
  hbs.registerHelper('nfc', (value, hash) => {
    numbro.setLanguage(locale);
    return numbro(value).formatCurrency({
      mantissa: 2,
      thousandSeparated: true
    });
  });

  // For byte based numeric values
  hbs.registerHelper('nfb', (value, hash) => {
    numbro.setLanguage(locale);
    return numbro(value).format({
      output: 'byte',
      base: 'binary'
    });
  });
};
