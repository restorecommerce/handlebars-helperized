const tripleStache = /\{\{\{\s*(.*?)\s*\}\}\}/g;
const doubleStache = /\{\{\s*(.*?)\s*\}\}/g;

module.exports = function localizationHandlebarsExtension(hbs) {
  hbs.registerHelper('t', (key, opts = {}) => {
    const locale = 'en_US'; // this.get('locale');
    let result = (opts.texts[key] || key);
    result = (typeof result === 'object') ? result[locale] : result;
    if (!result) return 'Missing translation for ' + key;
    const data = opts.hash;

    return result.replace(doubleStache, (i, match) => {
      return data[match] ? data[match] : ('{{' + match + '}}');
    }).replace(tripleStache, (i, match) => {
      // TODO: escaping
      return data[match] ? data[match] : ('{{' + match + '}}');
    });
  });
};
