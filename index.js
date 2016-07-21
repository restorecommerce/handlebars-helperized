'use strict';

/*
const slinkHelper = require('hbs-slink-helper');

const moment = require('moment-timezone');
const numeral = require('numeral');

// de in addition to en
const supportedLngs = ['de'];

var normalizedPath = require('path').join(__dirname, '../node_modules/numeral/languages');

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  supportedLngs.push(file.replace(/\.(.)*$/g, ''));
});

for (const i = 0; i < supportedLngs.length; i++) {
  const obj = require('numeral/languages/' + supportedLngs[i]);
  numeral.language(supportedLngs[i], obj);
}

var nfc = function(str, locale) {
  numeral.language(locale);
  return numeral(str).format('0,0.00');
};

var df = function(str, locale, timezone) {
  moment.locale(locale);
  return moment(new Date(str)).tz(timezone).format('L');
};

var dfl = function(str, locale, timezone) {
  moment.locale(locale);
  return moment(new Date(str)).tz(timezone).format('LL');
};

var tf = function(str, locale, timezone) {
  moment.locale(locale);
  return moment(new Date(str)).tz(timezone).format('LT');
};

var dtf = function(str, locale, timezone) {
  moment.locale(locale);
  return moment(new Date(str)).tz(timezone).format('LLL');
};

var dff = function(str, format, locale, timezone) {
  moment.locale(locale);
  return moment(new Date(str)).tz(timezone).format(format);
};

var increment = function(str) {
  var toIncrement = parseInt(str);
  if (!isNaN(toIncrement)) {
    return parseInt(str) + 1;
  }

  return '0';
};

handlebars.registerHelper('increment', function(str, opts) {
  return increment(str);
});

handlebars.registerHelper('t', function(str, opts) {
  const texts = opts.data.root.texts;
  const locale = opts.data.root.locale;
  const result = (typeof texts[str] === 'undefined') ? str : texts[str];
  result = (typeof result === 'object') ? result[locale] : result;
  if (!result) {
    return 'Missing translation for ' + str;
  }

  const data = opts.hash;
  return result.replace(/\{\{(.*?)\}\}/g, function(i, match) {
    return data[match] ? data[match] : ('{{' + match + '}}');
  });
});

handlebars.registerHelper('nfc', function(str, opts) {
  const locale = opts.data.root.locale;
  return nfc(str, locale);
});

// Date format short
handlebars.registerHelper('df', function(str, opts) {
  const locale = opts.data.root.locale;
  const timezone = opts.data.root.timezone;
  return df(str, locale, timezone);
});

// Date format Long
handlebars.registerHelper('dfl', function(str, opts) {
  const locale = opts.data.root.locale;
  const timezone = opts.data.root.timezone;
  return dfl(str, locale, timezone);
});

// Time format
handlebars.registerHelper('tf', function(str, opts) {
  const locale = opts.data.root.locale;
  const timezone = opts.data.root.timezone;
  return tf(str, locale, timezone);
});

// Date-Time format
handlebars.registerHelper('dtf', function(str, opts) {
  const locale = opts.data.root.locale;
  const timezone = opts.data.root.timezone;
  return dtf(str, locale, timezone);
});

// Date-Time format with given format
handlebars.registerHelper('dff', function(str, format, opts) {
  const locale = opts.data.root.locale;
  const timezone = opts.data.root.timezone;
  return dff(str, format, locale, timezone);
});

*/

// initializes and configures a custom handlebars instance
function init(opts) {
  // the basic building block is the handlebars rendering engine
  const hbs = require('handlebars');
  // more functionality directly added via custom plugins from ./lib
  require('./lib/numbro-helpers')(hbs, opts); // numbers & currencies
  require('./lib/moment-helpers')(hbs, opts); // dates, times & durations
  require('./lib/l10n-helpers')(hbs, opts); // localization
  // extend rendering with layout functionality
  const handlebarsLayouts = require('handlebars-layouts');
  handlebarsLayouts.register(hbs);
  return hbs;
}

/**
the following data is expected on the context:

- texts - an array of translations as key/ value object
- locale - current locale
- data - object with key value pairs for placeholders

*/

class Renderer {
  /**
  @param {String} template the template
  @param {String} layout the optional layout
  @param {Object} settings and localization data for the renderer
  */
  constructor(template, layout, opts) {
    this.hbs = init(opts);
    if (layout) {
      this.hbs.registerPartial('layout', layout);
    }
    this.template = this.hbs.compile(template);
  }

  /**
  @param {Object} context
  @return {String} html
  */
  render(context) {
    return this.template(context);
  }
}

module.exports = Renderer;
