module.exports = function customHandlebarsExtensions(hbs, opts) {
  // increment a given numerical string by one
  hbs.registerHelper('increment', (value, hash) => {
    const toIncrement = parseInt(value, 10);
    if (!isNaN(toIncrement)) return toIncrement + 1;
    return '0';
  });
};
