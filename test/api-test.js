'use strict';

/* eslint-env node, mocha */

// eslint-disable-next-line
const should = require('should');
const moment = require('moment-timezone');
const Renderer = require('../index');

const HTML_CONTENT_TYPE = 'application/html';

/**
 * Documented API testing (stuff on README should work as expected)
 */
describe('The README examples', () => {
  it('should pass the basic example', () => {
    const tpl = '<h1>Hello {{name}}</h1>';
    const renderer = new Renderer(tpl);
    const result = renderer.render({ name: 'John' }, HTML_CONTENT_TYPE);
    const expectedResult = '<h1>Hello John</h1>';
    result.should.equal(expectedResult);
  });

  it('should pass the layout example', () => {
    const tpl = `
    {{#extend "layout"}}
      {{#content "main"}}
        Hello, <i>{{name}}</i>
      {{/content}}
    {{/extend}}`;
    const layout = `
    <p>
      {{#block "main"}}
        stuff
      {{/block}}
    </p>`;
    const renderer = new Renderer(tpl, layout);
    const result = renderer.render({ name: 'John' }, HTML_CONTENT_TYPE).replace(/\s/g, '');
    const expectedResult = '<p>Hello,<i>John</i></p>';
    result.should.equal(expectedResult);
  });

  it('should pass the localization example', () => {
    const tpl = '<h1>{{t "greeting"}} {{name}}</h1>';
    const opts = { texts: { greeting: 'Hallo' } };
    const renderer = new Renderer(tpl, null, null, opts);
    const result = renderer.render({ name: 'John' }, HTML_CONTENT_TYPE);
    const expectedResult = '<h1>Hallo John</h1>';
    result.should.equal(expectedResult);
  });

  it('should pass the localization example with context', () => {
    const tpl = '<h1>{{t "greeting" name=name}}</h1>';
    const opts = { texts: { greeting: 'Hallo {{name}}' } };
    const renderer = new Renderer(tpl, null, null, opts);
    const result = renderer.render({ name: 'John' }, HTML_CONTENT_TYPE);
    const expectedResult = '<h1>Hallo John</h1>';
    result.should.equal(expectedResult);
  });

  it('should pass the formatting example', () => {
    const tpl = '<p>You paid {{nfc price cs="$"}} on {{df date}}</p>';
    const renderer = new Renderer(tpl);
    const ts = '07-22-2018 13:37:00';
    const format = 'MM-DD-YYYY HH:mm:ss';
    const tz = moment.tz.guess();
    const yesterday = moment.parseZone(ts, format, tz);
    const result = renderer.render({ price: 1.99, date: yesterday }, HTML_CONTENT_TYPE);
    const expectedResult = '<p>You paid $1.99 on 07/22/2018</p>';
    result.should.equal(expectedResult);
  });

  it('should pass the formatting example directly from the template', () => {
    const tpl = '<p>You paid {{nfc price cs="$"}} on {{dff date format=\'YYYY-DD-MM HH:mm:ss\'}}</p>';
    const renderer = new Renderer(tpl);
    const ts = '2018-07-22 13:37:00';
    const result = renderer.render({ price: 1.99, date: ts }, HTML_CONTENT_TYPE);
    const expectedResult = '<p>You paid $1.99 on 2018-22-07 13:37:00</p>';
    result.should.equal(expectedResult);
  });

  it('should format with a custom timezone', () => {
    const tpl = '<p>You paid {{nfc price cs="€" csPos="postfix"}} on {{dff date format=\'YYYY-DD-MM HH:mm:ss\' timezone="Europe/Moscow"}}</p>';
    const renderer = new Renderer(tpl);
    const ts = '2018-03-02T10:46:43.246Z';
    const result = renderer.render({ price: 1.99, date: ts }, HTML_CONTENT_TYPE);
    // Moscow is 3 hours in advance of GMT
    const expectedResult = '<p>You paid 1.99€ on 2018-02-03 13:46:43</p>';
    result.should.equal(expectedResult);
  });

  it('should pass the formatting example with german locale', () => {
    const tpl = '<p>You paid {{nfc price cs="€" csPos="postfix"}} on {{df date}}</p>';
    const renderer = new Renderer(tpl, null, null, { locale: 'de_DE' });
    const ts = '07-22-2018 13:37:00';
    const format = 'MM-DD-YYYY HH:mm:ss';
    const tz = moment.tz.guess();
    const yesterday = moment.parseZone(ts, format, tz);
    const result = renderer.render({ price: 1.99, date: yesterday }, HTML_CONTENT_TYPE);
    const expectedResult = '<p>You paid 1,99€ on 22.07.2018</p>';
    result.should.equal(expectedResult);
  });
});
