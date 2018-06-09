const chai = require('chai');
const assert = chai.assert;
const zuido = require('../lib/Zuido');

const program = {};

program.outputHelp = function() {
  return 'help';
}

describe('`getArgs()` should work as expected.', function(){
  it('should return error if illegal URL is passed.', function(){
    program.args = ['test'];
    assert.deepEqual('error', zuido.getArgs(program, () => {
      return 'error'
    }));
  });
  it('should return error if empty URL is passed.', function(){
    program.args = [''];
    assert.deepEqual('error', zuido.getArgs(program, () => {
      return 'error'
    }));
  });
  it('should return default values.', function(){
    program.args = ['http://localhost:8080/hello-world'];
    const args = zuido.getArgs(program, () => {});
    assert.deepEqual('http://localhost:8080', args.origin);
    assert.deepEqual('http://localhost:8080/hello-world', args.url);
    assert.deepEqual('/https?:\\/\\/localhost:8080/gi', args.regex.toString());
    assert.deepEqual(5000, args.proxy);
    assert.deepEqual(`${process.env.HOME}/.ngrok2/ngrok.yml`, args.config);
  });
  it('should return values as expected.', function(){
    program.args = ['http://localhost:8080/hello-world'];
    program.proxy = 3333;
    program.config = 'hello';
    const args = zuido.getArgs(program, () => {});
    assert.deepEqual('http://localhost:8080', args.origin);
    assert.deepEqual('http://localhost:8080/hello-world', args.url);
    assert.deepEqual('/https?:\\/\\/localhost:8080/gi', args.regex.toString());
    assert.deepEqual(3333, args.proxy);
    assert.deepEqual('hello', args.config);
  });
});
