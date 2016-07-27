#  handlebars-helperized

Opininated handlebars based templating engine for rendering e-mail like content.

The following helpers are injected by default:

- [Handlebars layouts](https://github.com/shannonmoeller/handlebars-layouts)
- [numbro](https://www.npmjs.com/package/numbro) for number formatting
- [moment-timezone](https://www.npmjs.com/package/moment-timezone) for proper date/time handling

Additionally, a lightweight localization plugin is provided through a handlebars extension `t`.

## Installation & Usage

This renderer can be used *standalone* in any node.js project on the server side. Due to the heavy weight, this pre-charged template renderer is mainly
intended for *server side usage*.

The simplest use case looks like this:

````js
// require the library
const Renderer = require('handlebars-helperized');

// initialize a renderer instance with a template string
const tpl = `<h1>Hello {{name}}</h1>`;
const renderer = new Renderer(tpl);

// use the renderer with arbitrary contextual data
const result = renderer.render({ name: 'John' });
// result === '<h1>Hello John</h1>';
````

If you want to use an additional layout template to enclose your main template, just pass the renderer an additional parameter, like this:

````js
// require the library
const Renderer = require('handlebars-helperized');

// initialize a renderer instance with a template string
const tpl = `
{{#extend "layout"}}
  {{#content "main"}}
    Hello, <i>{{name}}</i>
  {{/content}}
{{/extend}}`;
const layout = `
<p>
  {{#block main}}
    stuff
  {{/block}}
</p>`;
const renderer = new Renderer(tpl, layout);

// use the renderer with arbitrary contextual data
const result = renderer.render({ name: 'John' });
// result === '<p>Hello, <i>John</i></h1>';
````

For localized content, you can leverage the `t` helper inside of your templates and provide **t**ranslation templates as the *third* parameter of the renderer like this:

````js
// require the library
const Renderer = require('handlebars-helperized');

// template string with translation placeholder
const tpl = `<h1>{{t 'greeting'}} {{name}}</h1>`;

// options object with translation texts included
const opts = {
  texts: {
    'greeting': 'Hallo'
  }
}

// renderer instance without a layout but with translation options
const renderer = new Renderer(tpl, null, opts);

// use the renderer with arbitrary contextual data
const result = renderer.render({ name: 'John' });
// result === '<h1>Hallo John</h1>';
````
