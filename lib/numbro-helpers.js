const numbro = require('numbro');

module.exports = function numbroHandlebarsExtension(hbs) {
  // For numeric values without decimals
  hbs.registerHelper('nfn', ([value, locale], hash) => {
    numbro.language(locale);
    return numbro(value).format('0,0');
  });

  // For currency based numeric values
  hbs.registerHelper('nfc', ([value, locale], hash) => {
    numbro.language(locale);
    return numbro(value).format('0,0.00');
  });

  // For byte based numeric values
  hbs.registerHelper('nfb', ([value, locale], hash) => {
    numbro.language(locale);
    return numbro(value).format('0.00b');
  });

  /**
   * TODO: l10n integration
    function makeHelper(fn) {
      return Ember.Helper.extend({
        l10n: Ember.inject.service(L10nServiceName),
        onLocaleChange: observer('l10n.locale', function() {
          this.recompute();
        }),
        compute(params, hash) {
          params.push(this.get('l10n.locale'));
          return fn(params, hash);
        }
      });
    }
   */
};
