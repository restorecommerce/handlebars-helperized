'use strict';
/* eslint-env node, mocha */

// eslint-disable-next-line
const should = require('should');
// const moment = require('moment-timezone');

const Renderer = require('../index');


/**
 * Documented API testing (stuff on README should work as expected)
 */
describe('The README examples', () => {
  it('should pass the basic example', () => {
    const tpl = '<h1>Hello {{name}}</h1>';
    const renderer = new Renderer(tpl);
    const result = renderer.render({ name: 'John' });
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
    const result = renderer.render({ name: 'John' }).replace(/\s/g, '');
    const expectedResult = '<p>Hello,<i>John</i></p>';
    result.should.equal(expectedResult);
  });

  it('should pass the localization example', () => {
    const tpl = '<h1>{{t "greeting"}} {{name}}</h1>';
    const opts = { texts: { greeting: 'Hallo' } };
    const renderer = new Renderer(tpl, null, opts);
    const result = renderer.render({ name: 'John' });
    const expectedResult = '<h1>Hallo John</h1>';
    result.should.equal(expectedResult);
  });
});