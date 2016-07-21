const moment = require('moment');

module.exports = function momentHandlebarsExtension(hbs, opts) {
  // Output point in time relative to current point in time
  // for example: '1h ago'
  hbs.registerHelper('ago', ([value, locale], hash) => {
    let v = value;
    if (hash.isSeconds) {
      // the given property represents seconds since UNIX epoch, so we
      // multiply by 1000 to get the date in milliseconds since UNIX epoch
      v *= 1000;
    }
    return moment(v).locale(locale).fromNow();
  });

  // Date format short
  hbs.registerHelper('df', ([value, locale], hash) => {
    return moment(value).locale(locale).format('L');
  });

  // Date format Long
  hbs.registerHelper('dfl', ([value, locale], hash) => {
    return moment(value).locale(locale).format('LL');
  });

  // Time format
  hbs.registerHelper('tf', ([value, locale], hash) => {
    return moment(value).locale(locale).format('LT');
  });

  // Date-Time format
  hbs.registerHelper('dtf', ([value, locale], hash) => {
    return moment(value).locale(locale).format('LLL');
  });

  // Date-Time format with given format
  hbs.registerHelper('dff', ([value, format, locale], hash) => {
    return moment(value).locale(locale).format(format);
  });

  // Duration formatting
  // Warning, localization should not be used with this:
  // While the pattern `D` yields the number of days
  // `dddd` would yield to a name of a weekday which is
  // of course not applicapble for a duration.
  //
  // A format can be a template string with this syntax:
  // '[it\'s] D [days and] h [hours]'
  hbs.registerHelper('duf', ([value, format], hash) => {
    const dur = moment.duration(value);
    return moment(dur._data).format(format);
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
