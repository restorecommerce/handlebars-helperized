'use strict';

const _ = require('lodash');

const defaultOpts = {
  locale: 'en_US',
  texts: {}
};

// initializes and configures a custom handlebars instance
function init(options) {
  // default values if nothing given
  const opts = _.defaults(options, defaultOpts);
  // the basic building block is the handlebars rendering engine
  const hbs = require('handlebars');
  // more functionality directly added via custom plugins from ./lib
  require('./lib/l10n-helpers')(hbs, opts); // localization
  require('./lib/numbro-helpers')(hbs, opts); // numbers & currencies
  require('./lib/moment-helpers')(hbs, opts); // dates, times & durations
  // extend rendering with layout functionality
  const handlebarsLayouts = require('handlebars-layouts');
  handlebarsLayouts.register(hbs);
  return hbs;
}

class Renderer {
  /**
  @param {String} template the template
  @param {String} layout the optional layout
  @param {Object} text and localization string for the renderer
  */
  constructor(template, layout, opts) {
    this.hbs = init(opts);
    if (layout) {
      this.hbs.registerPartial('layout', layout);
    }
    this.template = this.hbs.compile(template);
  }

  /**
  @param {Object} context: required data for the placeholders
  @return {String} html
  */
  render(context) {
    return this.template(context);
  }
}

module.exports = Renderer;
