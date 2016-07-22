const fs = require('fs');
const should = require('should');
const moment = require('moment');

const Renderer = require('../index');

const data = {
  firstName: 'John',
  lastName: 'Doe'
}

const load = function(name) {
  return fs.readFileSync('./test/templates/' + name + '.hbs', 'utf-8');
};

const basicTpl = load('basic');
const layoutTpl = load('layout');
const layoutUseTpl = load('layout-use');

describe('the handlebars template engine', function() {
  describe('pre-charged with helpers', function() {
    it('should be able to render basic templates', function (done) {
      const renderer = new Renderer(basicTpl);
      let result = renderer.render(data);
      result = result.replace(/\s/g, '');
      result.should.equal('<div>JohnDoe</div>');
      done();
    });

    it('should be able to render templates with layouts', function (done) {
      const renderer = new Renderer(layoutUseTpl, layoutTpl);
      let result = renderer.render(data);
      result = result.replace(/\s/g, '');
      result.should.equal('<div>HeaderDefaultContentMainOverwrittenContent</div>');
      done();
    });
  });
});

describe('the handlebars extensions', () => {
  beforeEach(() => {
    // TODO: some preparation
  });

  it('should translate localization placeholders', () => {
    const tpl = load('payment-notification');
    const opts = {
      texts: {
        'emails.common.adminGreeting': 'Hello Admin',
        'emails.paymentNotification.message': 'Payment Received: {{orderIRI}}'
      }
    };
    const renderer = new Renderer(tpl, null, opts);
    const context = {orderIRI: 'http://example.com/42'};
    const result = renderer.render(context);
    const expectedResult = `<h1 class="vclAlignCentered">Hello Admin</h1>\n\n` +
      `<p class="vclAlignCentered">\n  Payment Received: http://example.com/42\n</p>\n`;
    result.should.equal(expectedResult);
  });

  it('should transform numeric helpers', () => {
    const tpl = load('numbers');
    const renderer = new Renderer(tpl, null, {});
    const result = renderer.render({});
    const expectedResult = `number: 42\nprice: 42.00\nbytes: 42.00B`;
    result.should.equal(expectedResult);
  });

  it('should transform time helpers', () => {
    const tpl = load('times');
    const renderer = new Renderer(tpl, null, {});
    const context = { yesterday: moment("07-22-2016", "MM-DD-YYYY") };
    const result = renderer.render(context);
    const expectedResult = `ago: 18 hours ago\ndf: 07/22/2016\ndtf: July 22, 2016 12:00 AM`;
    result.should.equal(expectedResult);
  });
});