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
});
