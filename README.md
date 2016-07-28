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

It is also possible to have data placeholders *within* the translation texts as well, like this:

````js
// require the library
const Renderer = require('handlebars-helperized');

// template string with translation placeholder
const tpl = `<h1>{{t 'greeting' name=name}}</h1>`;

// options object with translation texts included
const opts = {
  texts: {
    'greeting': 'Hallo {{name}}'
  }
}

// renderer instance without a layout but with translation options
const renderer = new Renderer(tpl, null, opts);

// use the renderer with arbitrary contextual data
const result = renderer.render({ name: 'John' });
// result === '<h1>Hallo John</h1>';
````

Additionally, bespoke helpers for formatting date, time and numbers may be used. Have a look at the extensions itself for an overview of the provided helpers. An example for these formatting capabilities looks like this:

````js
// require the library
const Renderer = require('handlebars-helperized');

// initialize a renderer instance with a template string
const tpl = '<p>You paid ${{nfc price}} on {{df date}}</p>';
const renderer = new Renderer(tpl);

// create a timestamp & use the renderer with arbitrary contextual data
const ts = '07-22-2016 13:37:00';
const format = 'MM-DD-YYYY HH:mm:ss';
const tz = moment.tz.guess();
const yesterday = moment.tz(ts, format, tz);
const result = renderer.render({ price: 1.99, date: yesterday });
// result === '<p>You paid $1.99 on 07/22/2016</p>';
````
