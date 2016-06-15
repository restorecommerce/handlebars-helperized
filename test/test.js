const fs = require('fs');
const should = require('should');

const Renderer = require('../index');

const data = {
  firstName: 'John',
  lastName: 'Doe'
}

const basicTpl = fs.readFileSync('./test/templates/basic.hbs' , 'utf-8');
const layoutTpl = fs.readFileSync('./test/templates/layout.hbs' , 'utf-8');
const layoutUseTpl = fs.readFileSync('./test/templates/layout-use.hbs' , 'utf-8');


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
