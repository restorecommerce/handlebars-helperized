'use strict';

/* eslint-env node, mocha */

// eslint-disable-next-line
const should = require('should');
const fs = require('fs');
const Renderer = require('../index');

const data = {
  firstName: 'John',
  lastName: 'Doe'
};

const load = function loadTemplateFile(name) {
  return fs.readFileSync(`./test/templates/${name}.hbs`, 'utf-8');
};

const basicTpl = load('basic');
const layoutTpl = load('layout');
const layoutUseTpl = load('layout-use');
const style = fs.readFileSync('./test/templates/basic.css', 'utf-8');

/**
 * Core functionality testing
 */
describe('the handlebars template engine', () => {
  it('should be able to render basic templates', (done) => {
    const renderer = new Renderer(basicTpl);
    let result = renderer.render(data);
    result = result.replace(/\s/g, '');
    result.should.equal('<div>JohnDoe</div>');
    done();
  });

  it('should be able to render templates with layouts', (done) => {
    const renderer = new Renderer(layoutUseTpl, layoutTpl);
    let result = renderer.render(data);
    result = result.replace(/\s/g, '');
    result.should.equal('<div>HeaderDefaultContentMainOverwrittenContent</div>');
    done();
  });

  it('should be able to render templates with a style', (done) => {
    const renderer = new Renderer(basicTpl, layoutUseTpl, style);
    let result = renderer.render(data);
    result = result.replace(/\r?\n|\r/g, '');
    result.should.equal('<div style="color: red; text-align: center;">John Doe</div>');
    done();
  });
});
