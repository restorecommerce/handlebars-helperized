const moment = require('moment-timezone');

module.exports = function momentHandlebarsExtension(hbs, opts) {
  // Output point in time relative to current point in time
  // for example: '1h ago'
  hbs.registerHelper('ago', (value, hash) => {
    let v = value;
    if (hash.isSeconds) {
      // the given property represents seconds since UNIX epoch, so we
      // multiply by 1000 to get the date in milliseconds since UNIX epoch
      v *= 1000;
    }
    const tz = hash.timezone || moment.tz.guess();
    return moment.tz(v, tz).locale(opts.locale).fromNow();
  });

  // Date format short
  hbs.registerHelper('df', (value, hash) => {
    const tz = hash.timezone || moment.tz.guess();
    return moment.tz(value, tz).locale(opts.locale).format('L');
  });

  // Date format Long
  hbs.registerHelper('dfl', (value, hash) => {
    const tz = hash.timezone || moment.tz.guess();
    return moment.tz(value, tz).locale(opts.locale).format('LL');
  });

  // Time format
  hbs.registerHelper('tf', (value, hash) => {
    const tz = hash.timezone || moment.tz.guess();
    return moment.tz(value, tz).locale(opts.locale).format('LT');
  });

  // Date-Time format
  hbs.registerHelper('dtf', (value, hash) => {
    const tz = hash.timezone || moment.tz.guess();
    return moment.tz(value, tz).locale(opts.locale).format('LLL');
  });

  // Date-Time format with given format
  hbs.registerHelper('dff', ([value, format], hash) => {
    const tz = hash.timezone || moment.tz.guess();
    return moment.tz(value, tz).locale(opts.locale).format(format);
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
    // eslint-disable-next-line
    return moment(dur._data).format(format);
  });
};
