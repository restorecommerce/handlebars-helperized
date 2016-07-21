const tripleStache = /\{\{\{\s*(.*?)\s*\}\}\}/g;
const doubleStache = /\{\{\s*(.*?)\s*\}\}/g;

module.exports = function localizationHandlebarsExtension(hbs, opts) {
  hbs.registerHelper('t', (key, hash = {}) => {
    const locale = 'en_US'; // this.get('locale');
    let result = (hash.texts[key] || key);
    result = (typeof result === 'object') ? result[locale] : result;
    if (!result) return 'Missing translation for ' + key;
    const data = hash.hash;

    return result.replace(doubleStache, (i, match) => {
      return data[match] ? data[match] : ('{{' + match + '}}');
    }).replace(tripleStache, (i, match) => {
      // TODO: escaping
      return data[match] ? data[match] : ('{{{' + match + '}}}');
    });
  });
};
