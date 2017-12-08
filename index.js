'use strict';

const _ = require('lodash');
const juice = require('juice');

const defaultOpts = {
  locale: 'en_US',
  texts: {}
};

// Initializes and configures a custom handlebars instance
function init(options) {
  // default values if nothing given
  const opts = _.defaults(options, defaultOpts);
  // the basic building block is the handlebars rendering engine
  const hbs = require('handlebars');
  // more functionality directly added via custom plugins from ./lib
  require('./lib/l10n-helpers')(hbs, opts); // localization
  require('./lib/numbro-helpers')(hbs, opts); // numbers & currencies
  require('./lib/moment-helpers')(hbs, opts); // dates, times & durations
  require('./lib/custom-helpers')(hbs, opts); // everything else
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
  constructor(template, layout, style, opts) {
    this.hbs = init(opts);
    this.style = style;
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
    let html = this.template(context);

    if (this.style) {
      html = juice.inlineContent(html, this.style, {
        inlinePseudoElements: true,
        preserveImportant: true,
        preserveMediaQueries: true,
        preserveFontFaces: true,
        applyWidthAttributes: true,
        applyHeightAttributes: true,
        insertPreservedExtraCss: true
      });
    }

    return html;
  }
}

module.exports = Renderer;
